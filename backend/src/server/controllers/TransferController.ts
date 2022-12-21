import { Request, Response } from 'express';
import TransferService from '../services/TransferService';

export default class TransferController {
  private _service: TransferService;

  constructor(service: TransferService) {
    this._service = service;
  }

  public transfer = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const message = await this._service.transfer(req.body, authorization as string)

    res.status(201).json({ message });
  };
}