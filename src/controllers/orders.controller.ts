import { Request, Response } from 'express';
import ordesService from '../services/ordes.service';
import TStatus from '../types/status';
import TOrder from '../types/order';

const getAll = async (_req: Request, res: Response): Promise<void> => {
  const { status, message }: TStatus = await ordesService.getAll();
  if (status) { res.status(status).json({ message }); return; }

  res.status(200).json(message);
};

const set = async ({ body }: Request, res: Response) => {
  const { user: { id }, productsIds } = body;
  const { status, message }: TStatus = await ordesService
    .set({ userId: id, productsIds } as TOrder);
  if (status) return res.status(status).json({ message });

  res.status(201).json(message);
};

export default {
  getAll,
  set,
};
