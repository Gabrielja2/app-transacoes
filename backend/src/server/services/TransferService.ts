import UserModel from '../../database/models/User';
import AccountModel from '../../database/models/Account';
import TransactionModel from '../../database/models/Transaction';
import { decodeToken } from '../helpers/tokenGenerate';
import CustomError from '../helpers/CustomError';
import { IBody } from '../interfaces/IBody';
import { IAccount } from '../interfaces/IAccount';


export default class TransferService {

    private static findByName = async (name: string) => {
        const user = await UserModel.findOne({ where: { username: name } })

        return user
    }

    private static getUserDebitedBalance = async (body: IBody, token: string): Promise<IAccount> => {
        const userCashoutName = decodeToken(token).username;
        const getuserCashout = await TransferService.findByName(userCashoutName);
        const userCashout = getuserCashout?.dataValues
        const userCashoutAccountId = userCashout?.accountId;

        const getuserCashoutAccount = await AccountModel.findByPk(userCashoutAccountId);
        const userCashoutAccount = getuserCashoutAccount?.dataValues;       ;     
 
        const { valor } = body
        let userCashoutAccountBalance = userCashoutAccount?.balance

        if (Number(userCashoutAccountBalance) < valor) throw new CustomError(400, 'Value transfer cant be greater than account balance');
        
        return userCashoutAccount;
    }

    private static getUserCreditedBalance = async (body: IBody): Promise<IAccount> => {
        const getuserCashin = await TransferService.findByName(body.username);
        const userCashin = getuserCashin?.dataValues;
        const userCashinAccountId = userCashin?.accountId;

        const getuserCashinAccount = await AccountModel.findByPk(userCashinAccountId);
        const userCashinAccount = getuserCashinAccount?.dataValues     

        if (userCashin === null) throw new CustomError(400, 'Invalid username to receive payment')

        return userCashinAccount;
    }

    public transfer = async (body: IBody, token: string): Promise<string> => {
        const { username, valor } = body;

        const userCashoutName = decodeToken(token).username;
        const getuserCashout = await TransferService.findByName(userCashoutName);
        const userCashout = getuserCashout?.dataValues;
        const userCashoutAccountId = userCashout?.accountId;

        const getuserCashin = await TransferService.findByName(body.username); 
        const userCashin = getuserCashin?.dataValues;
        const userCashinAccountId = userCashin?.accountId;
        const userCashinName = userCashin?.username;    

        if (userCashoutName === userCashinName) throw new CustomError(400, 'Unable to send a transaction to itself')

        const cashoutUserAccount = await TransferService.getUserDebitedBalance(body, token)
        const cashoutBalance = cashoutUserAccount.balance;

        const cashinUserAccount = await TransferService.getUserCreditedBalance(body)
        const cashinBalance = cashinUserAccount.balance;

        await AccountModel.update(
            {
                balance: Number(cashoutBalance) - valor,

            },
            {
                where: { id: userCashoutAccountId }
            }
        )

        await AccountModel.update(
            {
                balance: Number(cashinBalance) + valor,
            },
            {
                where: { id: userCashinAccountId }
            }
        )     

        const transction = await TransactionModel.create({
            debitedAccountId: userCashoutAccountId,
            creditedAccountId: userCashinAccountId,
            value: valor,
            createdAt: new Date()
        })
        console.log('trans', transction.dataValues)
        return 'Transaction sucessfully'
    };


}