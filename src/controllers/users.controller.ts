import { Request, Response } from 'express';
import usersService from '../services/users.service';
import TStatus from '../types/status';

const set = async (req: Request, res: Response): Promise<void> => {
  const { body: { username, vocation, level, password } } = req;

  const { status, message }: TStatus = await usersService
    .set({ username, vocation, level, password });
  if (status) { res.status(status).json({ message }); return; }
  
  res.status(201).json(message);
};

export default {
  set,
};
