import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  lastLogin: Date | null;
  otp?: string;
}

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  otp: {
    type: String,
  },
});

export default mongoose.model<IUser>('User', userSchema);
