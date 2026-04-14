import express from 'express';
import cors from 'cors';
import authRouter from './routers/auth.router.js';
import transactionRouter from './routers/transaction.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionRouter);

export default app;