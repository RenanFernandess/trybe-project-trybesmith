import { Request, Response } from 'express';
import usersService from '../services/users.service';
import TStatus from '../types/status';

const set = async (req: Request, res: Response) => {
  const { body: { username, vocation, level, password } } = req;

  const { status, message }: TStatus = await usersService
    .set({ username, vocation, level, password });
  if (status) return res.status(status).json({ message });
  
  res.status(201).json({ token: message });
};

const login = async ({ body }: Request, res: Response) => {
  const { status, message }: TStatus = await usersService.login(body);
  if (status) return res.status(status).json({ message }); 
  res.status(200).json({ token: message });
};

export default {
  set,
  login,
};
