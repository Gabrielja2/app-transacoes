import { Request, Response } from 'express';
import TransactionService from '../services/TransactionService';

export default class TransactionController {
    private _service: TransactionService;

    constructor(service: TransactionService) {
        this._service = service;
    }

    public show = async (req: Request, res: Response) => {
        const { authorization } = req.headers;

        const transactions = await this._service.show(req.query as any, authorization as string)

        res.status(201).json({ transactions });
    };
}