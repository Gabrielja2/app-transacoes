import { Router } from 'express';
import TransferService from '../services/TransferService';
import TransferController from '../controllers/TransferController';
const transferRouter = Router();

const transferService = new TransferService();
const transferController = new TransferController(transferService);

transferRouter.put('/', transferController.transfer);

export default transferRouter;