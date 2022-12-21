import { Request, Response, NextFunction } from 'express';
import CustomError from '../helpers/CustomError';
import loginSchema from '../schemas/loginSchema';


function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  const { error } = loginSchema.validate({ username, password });

  if (error) throw new CustomError(400, error.message);
  next();
}

export default loginMiddleware;