import { Router } from 'express';
import BalanceService from '../services/BalanceService';
import BalanceController from '../controllers/BalanceController';
const balanceRouter = Router();

const balanceService = new BalanceService();
const balanceController = new BalanceController(balanceService);

balanceRouter.get('/', balanceController.show);

export default balanceRouter;