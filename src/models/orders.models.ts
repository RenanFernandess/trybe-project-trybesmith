import { ResultSetHeader, RowDataPacket } from 'mysql2';
import TOrder from '../types/order';
import connection from './connection';
import productsModel from './products.model';

const getAll = async (): Promise<TOrder[]> => {
  const SELECT_ORDER = (
    `SELECT
      orders.id,
      orders.user_id As 'userId',
      JSON_ARRAYAGG(products.id) AS 'productsIds'
    FROM Trybesmith.orders AS orders
    INNER JOIN Trybesmith.products AS products
    ON orders.id = products.order_id
    GROUP BY orders.id`
  );
  const [orders] = await connection.execute<RowDataPacket[] & TOrder[]>(SELECT_ORDER);
  return orders;
};

const create = async (userId: number) => {
  const SET_ORDER = 'INSERT INTO Trybesmith.orders (user_id) VALUE (?)';
  const [{ insertId }] = await connection.execute<ResultSetHeader>(SET_ORDER, [userId]);
  return insertId;
};

const set = async ({ userId, productsIds }: TOrder) => {
  const orderId = await create(userId);
  const result = await productsModel.update({ orderId, productsIds });
  return result;
};

export default {
  getAll,
  set,
  create,
};