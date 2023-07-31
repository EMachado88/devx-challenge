import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import User, { IUser } from './models/User';

const host: string = process.env.HOST ?? 'localhost';
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

const loginDays = 7;

const generateOTP = (): string => {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Log it per requirement
  console.log('OTP:', otp);
  return otp;
};

// Express and middleware
const app: Application = express();
app.use(express.json());
app.use(cors());

// Base route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Nothing to see here, move along' });
});

// Login route
app.post('/login', async (req: Request, res: Response) => {
  const { email } = req.body;

  let user: IUser = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email });
  }

  // If the user has never logged in before, or if it's been more than X days (7) since their last login, require MFA
  if (!user.lastLogin || Date.now() - user.lastLogin.getTime() > loginDays * 24 * 60 * 60 * 1000) {
    const otp = generateOTP();
    return res.json({ mfaRequired: true, otp });
  }

  return res.send({ user });
});

// Init the API
(async () => {
  // Connect to MongoDB
  await mongoose
  .connect(process.env.MONGODB_URI)
    .then(() => console.log('[ ready ] Connected to DB'))
    .catch((err) => console.error('Error connecting to DB:', err));

  // Start the HTTP server
  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
})();

