import { Router } from 'express';
import TransactionService from '../services/TransactionService';
import TransactionController from '../controllers/TransactionController';

const transactionRouter = Router();

const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService);

transactionRouter.get('/', transactionController.show);

export default transactionRouter;