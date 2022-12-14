import { Request, Response } from 'express';
import productsService from '../services/products.service';
import TStatus from '../types/status';

const set = async (req: Request, res: Response): Promise<void> => {
  const { body: { name, amount } } = req;

  const { status, message }: TStatus = await productsService.set({ name, amount });
  if (status) { res.status(status).json({ message }); return; }
  
  res.status(201).json(message);
};

const getAll = async (_req: Request, res: Response) => {
  const { status, message }: TStatus = await productsService.getAll();
  if (status) { res.status(status).json({ message }); return; }

  res.status(200).json(message);
};

export default {
  set,
  getAll,
};
