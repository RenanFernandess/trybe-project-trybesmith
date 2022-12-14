import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import TProduct from '../types/product';
import connection from './database/connection';

const set = async ({ name, amount, orderId }: TProduct): Promise<TProduct[]> => {
  const INSERT_QUERY = 'INSERT INTO Trybesmith.products (name, amount, order_id) VALUES (?, ?, ?)';
  const SELECT_QUERY = 'SELECT id, name, amount FROM Trybesmith.products WHERE id =?';
  const [{ insertId }] = await connection
    .execute<ResultSetHeader>(INSERT_QUERY, [name, amount, orderId]);
  const [result] = await connection.execute<RowDataPacket[] & TProduct[]>(SELECT_QUERY, [insertId]);

  return result;
};

const getAll = async (): Promise<TProduct[]> => {
  const SELECT_QUERY = 'SELECT * FROM Trybesmith.products';
  const [rseult] = await connection.execute<RowDataPacket[] & TProduct[]>(SELECT_QUERY);

  return rseult;
};

export default {
  set,
  getAll,
};