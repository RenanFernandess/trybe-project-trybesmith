import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import TProduct from '../types/product';
import connection from './connection';

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

async function update({ orderId, productsIds }: { orderId: number, productsIds: number[] }) {
  const amountOfId = Array(productsIds.length).fill('?').join(', ');
  const UPDATE_QUERY = `UPDATE Trybesmith.products  SET order_id = ? WHERE id IN (${amountOfId})`;
  const [result] = await connection.execute<ResultSetHeader>(
    UPDATE_QUERY,
    [orderId, ...productsIds],
  );
  return result;
}

export default {
  set,
  getAll,
  update,
};