import { Request, Response } from 'express';
import porductsService from '../services/products.service';

const set = async (req: Request, res: Response): Promise<void> => {
  const { body: { name, amount } } = req;

  const { status, message } = await porductsService.set({ name, amount });
  if (status) { res.status(status).json({ message }); return; }
  
  res.status(201).json(message);
};

export default {
  set,
};
