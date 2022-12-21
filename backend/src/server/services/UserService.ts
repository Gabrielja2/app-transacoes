import bcrypt = require('bcrypt');
import CustomError from '../helpers/CustomError';
import UserModel from '../../database/models/User';
import generateToken from '../helpers/tokenGenerate';
import { ILogin } from '../interfaces/ILogin';
import { IToken } from '../interfaces/IToken';


export default class UserService {

  private static findByName = async (name: string) => {
    const user = await UserModel.findOne({ where: { username: name } })

    return user
}

private static validatePassword = async (username: string, password: string) => {
  const user = await UserService.findByName(username)

  if(user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new CustomError(401, 'Incorrect email or password');
  }

  return user
}

  public login = async ({ username, password }: ILogin): Promise<IToken> => {
    await UserService.validatePassword(username, password);

    const user = await UserService.findByName(username)    
    if (!user) throw new CustomError(401, 'username not found');

    const token = await generateToken(user.username);
    return { token };
  };
}
