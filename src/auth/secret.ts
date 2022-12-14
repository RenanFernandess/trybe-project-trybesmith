import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

const createToken = ({ id, email }: { id: number, email: string }): string => {
  const options:jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };
  const token: string = jwt.sign({ id, email }, secret, options);
  return token;
};

export default createToken;