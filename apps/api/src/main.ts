import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authController from './controllers/authController';

const host: string = process.env.HOST ?? 'localhost';
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

// Express and middleware
const app: Application = express();
app.use(express.json());
app.use(cors());

// Base route
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Nothing to see here, move along' });
});

// Login route
app.post('/login', authController.login);

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
