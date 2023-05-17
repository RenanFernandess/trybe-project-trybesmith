import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

const createToken = ({ id, username }: { id: number, username: string }): string => {
  const options:jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };
  const token: string = jwt.sign({ id, username }, secret, options);
  return token;
};

export const checkToken = (token:string) => {
  const { data } = jwt.verify(token, secret) as jwt.JwtPayload;
  return data;
};

export default createToken;