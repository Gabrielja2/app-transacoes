import express = require('express');
import 'express-async-errors';
import errorHandler from './middlewares/middlewareError';
import { balanceRouter, transferRouter, loginRouter, registerRouter, transactionRouter } from './routers/index';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use('/login', loginRouter);
    this.app.use('/register', registerRouter);
    this.app.use('/balance', balanceRouter);
    this.app.use('/transfer', transferRouter);
    this.app.use('/transactions', transactionRouter);

    this.app.use(errorHandler);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };


export const { app } = new App();