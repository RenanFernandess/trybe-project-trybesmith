import { RowDataPacket } from 'mysql2';
import TOrder from '../types/order';
import connection from './connection';

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

export default {
  getAll,
};