import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  lastLogin: Date | null;
}

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
});

export default mongoose.model<IUser>('User', userSchema);
