import UserModel from '../../database/models/User';
import AccountModel from '../../database/models/Account';
import { decodeToken } from '../helpers/tokenGenerate';
import CustomError from '../helpers/CustomError';

export default class BalanceService {

  public show = async (token: string): Promise<string> => {
    const { username } = decodeToken(token);

    const user = await UserModel.findOne({ where: { username } });
    const userAccountId = user?.accountId;

    const account = await AccountModel.findByPk(userAccountId);

    if (account) {
      const { balance } = account.dataValues;
      return balance;
    }

    throw new CustomError(401, 'AccountId not found');
  };
}