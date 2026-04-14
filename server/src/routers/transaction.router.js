import express from 'express';
import { addTransaction, listTransactions } from '../controllers/transaction.controller.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const transactionRouter = express.Router();
transactionRouter.post('/add', authenticateToken, addTransaction)
transactionRouter.get('/list', authenticateToken, listTransactions)

export default transactionRouter;