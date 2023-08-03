import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import generateOTP from '../utils/generateOTP';
import { lastLoginThreshold } from '../config/constants';

import User, { IUser } from '../models/User';

export default {
  login: async (req: Request, res: Response) => {
    const { email, password, otp } = req.body;

    try {
      let user: IUser = await User.findOne({ email }).populate('password');

      // If the user doesn't exist, create it
      if (!user) {
        user = await User.create({ email });
        return res.json({ requiresPassword: true });
      }

      // If the user is newly created, set the password and save
      if (!user.password) {
        user.password = await bcrypt.hash(password, 10);
        await user.save();
      }

      if (!password) {
        return res.json({ requiresPassword: true });
      }
      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // If it's been more than X time since their last login, require OTP
      if (
        !otp &&
        user.lastLogin !== null &&
        Date.now() - user.lastLogin.getTime() > lastLoginThreshold
      ) {
        const otp = generateOTP();
        user.otp = otp;
        await user.save();
        return res.json({ requiresMfa: true });
      }

      // If there is OTP in the request, verify it
      if (otp) {
        if (otp !== user.otp) {
          return res.status(401).json({ error: 'Invalid OTP' });
        }
        user.otp = undefined;
        await user.save();
      }

      // Update the last login date
      user.lastLogin = new Date();
      await user.save();

      const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '7d',
        }
      );

      // Return the access token
      return res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
