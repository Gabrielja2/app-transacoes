import { Request, Response } from 'express';
import RegisterService from '../services/RegisterService';

export default class RegisterController {
  private _service: RegisterService;

  constructor(service: RegisterService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response) => {
    const message = await this._service.create(req.body)

    res.status(201).json({ message });
  };
}