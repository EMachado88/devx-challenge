import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import User, { IUser } from './models/User';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app: Application = express();

// Express middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('[ ready ] Connected to DB'))
  .catch((err) => console.error('Error connecting to DB:', err));

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Nothing to see here, move along' });
});

app.post('/login', async (req: Request, res: Response) => {
  const { email } = req.body;

  let user: IUser = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email });
  }

  return res.send({ user });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

