import { JwtPayload, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';
import CustomError from './CustomError';

dotenv.config();

const generateToken = async (username: string) => {
  const KEY_SECRET = process.env.JWT_SECRET || 'secret';

  const payload = {
    username,
  };
  const jwtconfig = {
    expiresIn: '1d',
  };

  const token = sign(payload, KEY_SECRET, jwtconfig);
  return token;
};

export const decodeToken = (token: string) => {
  try {
    const decodedtoken = verify(token, 'secret') as JwtPayload;

    return decodedtoken;
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token');
  }
};

export default generateToken;