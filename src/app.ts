import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import questionRouter from './routers/questionRouter';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(questionRouter);
app.use(errorMiddleware);

export default app;
