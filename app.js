import express from 'express';
import userRouter from './routes/user.js';
export const app = express();
app.use(express.json());
app.use("/getusers", userRouter);
