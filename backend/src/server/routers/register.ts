import { Router } from 'express';
import RegisterService from '../services/RegisterService';
import RegisterController from '../controllers/RegisterController';
import loginMiddleware from '../middlewares/middlewareLogin';

const registerRouter = Router();

const registerService = new RegisterService();
const registerController = new RegisterController(registerService);

registerRouter.post('/', loginMiddleware, registerController.create);

export default registerRouter;