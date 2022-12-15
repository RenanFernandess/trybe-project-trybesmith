import { Request, Response } from 'express';
import ordesService from '../services/ordes.service';
import TStatus from '../types/status';

const getAll = async (_req: Request, res: Response): Promise<void> => {
  const { status, message }: TStatus = await ordesService.getAll();
  if (status) { res.status(status).json({ message }); return; }

  res.status(201).json(message);
};

export default {
  getAll,
};