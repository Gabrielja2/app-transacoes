import { Op } from 'sequelize';
import TransactionModel from '../../database/models/Transaction'
import UserModel from '../../database/models/User';
import { decodeToken } from '../helpers/tokenGenerate';
import { ITransaction } from '../interfaces/ITransaction';

export default class TransactionService {

    private static findByName = async (name: string) => {
        const user = await UserModel.findOne({ where: { username: name } });
        return user;
    }

    private static getUsername = async (token: string) => {      
        const { username } = decodeToken(token);
        return username;
    }

    private static getUserAccountId = async (token: string) => { 
        const username = await TransactionService.getUsername(token)
        const user = await TransactionService.findByName(username)
        const userAccountId = user?.dataValues.accountId;

        return userAccountId;
    }

    private static getCashinTransactions = async (token: string) => {
        const accountId = await TransactionService.getUserAccountId(token)

        const transactions = await TransactionModel.findAll({
            where: { creditedAccountId: accountId }
        });
        const cashinTransactions: ITransaction[] = transactions.map((t) => t.dataValues);
        return cashinTransactions;
    }

    private static cashinFilter = async (query: any, token: string) => {
        const { date } = query;

        if (date === 'cash-in') {
            const transactions = await TransactionService.getCashinTransactions(token);
            return transactions;
        }
        const undefinedTransaction = await TransactionService.undefinedFilter(query, token);
        return undefinedTransaction;
    }

    private static getCashoutTransactions = async (token: string) => {
        const accountId = await TransactionService.getUserAccountId(token)

        const transactions = await TransactionModel.findAll({
            where: { debitedAccountId: accountId }
        });
        const cashoutTransactions: ITransaction[] = transactions.map((t) => t.dataValues);
        return cashoutTransactions;
    }

    private static cashoutFilter = async (query: any, token: string) => {
        const { date } = query;
        const accountId = await TransactionService.getUserAccountId(token)

        if (date === 'cash-out') {
            const transactions = await TransactionService.getCashoutTransactions(token);
            return transactions;
        }
        const undefinedTransaction = await TransactionService.undefinedFilter(query, token);
        return undefinedTransaction;
    }

    private static undefinedFilter = async (query: any, token: string) => {
        const { date } = query;
        const accountId = await TransactionService.getUserAccountId(token)

        if (date === undefined) {
            const transactions = await TransactionModel.findAll({
                where: {
                    [Op.or]: [
                        { debitedAccountId: accountId },
                        { creditedAccountId: accountId }
                    ]
                }
            });
            const allTransactions: ITransaction[] = transactions.map((t) => t.dataValues);

            return allTransactions;
        }
    }

    private static getFilteredsByTransaction = async (query: any, token: string) => {

        const cashinTransaction = await TransactionService.cashinFilter(query, token);
        if (cashinTransaction) return cashinTransaction;

        const cashoutTransaction = await TransactionService.cashoutFilter(query, token);
        return cashoutTransaction;
         
    }

    private static transactionByDate = async (query: any, token: string) => {
        const { date } = query;
        const accountId = await TransactionService.getUserAccountId(token);
        const initialDate = new Date(`${date}:00:00:00Z`);
        const finalDate = new Date(`${date}:23:59:59Z`);

        const transactions = await TransactionModel.findAll({
            where: {
                [Op.or]: [
                    {
                        debitedAccountId: { [Op.eq]: accountId },
                        createdAt: { [Op.between]: [initialDate, finalDate] },
                    },
                    {
                        creditedAccountId: { [Op.eq]: accountId },
                        createdAt: { [Op.between]: [initialDate, finalDate] },
                    }
                ],
            },
        });
        const allTransactions: ITransaction[] = transactions.map((t) => t.dataValues);
        return allTransactions         
    }

    public show = async (query: any, token: string): Promise<ITransaction[] | undefined> => {
        

        const filteredTransactions = await TransactionService.getFilteredsByTransaction(query, token)
        if (filteredTransactions) return filteredTransactions;

        const dateTransactions = await TransactionService.transactionByDate(query, token);
        return dateTransactions;
        
    };
};