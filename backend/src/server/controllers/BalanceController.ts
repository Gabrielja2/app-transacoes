import { Request, Response } from 'express';
import BalanceService from '../services/BalanceService';

export default class BalanceController {
  private _service: BalanceService;

  constructor(service: BalanceService) {
    this._service = service;
  }

  public show = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    const balance = await this._service.show(authorization as string)

    res.status(200).json({ balance });
  };
}