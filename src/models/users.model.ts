import { ResultSetHeader, RowDataPacket } from 'mysql2';
import TUser from '../types/user';
import connection from './connection';

const set = async ({ username, vocation, level, password }: TUser): Promise<TUser[]> => {
  const INSERT_QUERY = `
    INSERT INTO Trybesmith.users (username, vocation, level, password)
    VALUES (?, ?, ?, ?)
  `;
  const SELECT_QUERY = 'SELECT id, username, vocation, level FROM Trybesmith.users WHERE id =?';
  const [{ insertId }] = await connection
    .execute<ResultSetHeader>(INSERT_QUERY, [username, vocation, level, password]);
  const [result] = await connection.execute<RowDataPacket[] & TUser[]>(SELECT_QUERY, [insertId]);

  return result;
};

export default {
  set,
};
