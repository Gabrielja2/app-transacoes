import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import loginMiddleware from '../middlewares/middlewareLogin';

const loginRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

loginRouter.post('/', loginMiddleware, userController.login);

export default loginRouter;

