import UserModel from '../../database/models/User';
import AccountModel from '../../database/models/Account';
import { IUser } from '../interfaces/IUser';
import CustomError from '../helpers/CustomError';
const bcrypt = require('bcrypt');


export default class RegisterService {

  private static hashPassword = async (password: string) => {
    return bcrypt.hashSync(password, 10)
  }

  public create = async ({ username, password }: IUser): Promise<string> => {
    const user = await UserModel.findOne({ where: { username } })

    if (!user) {
      const newUser = await UserModel.create({ username, password });
      const hashedPassword = await RegisterService.hashPassword(password)
        newUser.password = hashedPassword;

        const newAccount = await AccountModel.create({ balance: 100 })
        newUser.accountId = newAccount.id;
        await newUser.save();
      
        return 'Congratulations! User created successfully';
      }
      throw new CustomError(401, 'username already registered')
  };
}


