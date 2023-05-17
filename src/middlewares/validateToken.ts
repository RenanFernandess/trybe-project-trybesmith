import { NextFunction, Request, Response } from 'express';
import { checkToken } from '../auth/secret';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { headers: { authorization } } = req;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const data = checkToken(authorization);
    req.body.user = data;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateToken;
