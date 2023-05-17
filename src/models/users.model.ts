import { ResultSetHeader, RowDataPacket } from 'mysql2';
import TUser, { TUserRequest } from '../types/user';
import connection from './connection';

const set = async ({ username, vocation, level, password }: TUserRequest): Promise<TUser[]> => {
  const INSERT_QUERY = `
    INSERT INTO Trybesmith.users (username, vocation, level, password)
    VALUES (?, ?, ?, ?)`;
  const SELECT_QUERY = 'SELECT id, username, vocation, level FROM Trybesmith.users WHERE id =?';
  const [{ insertId }] = await connection
    .execute<ResultSetHeader>(INSERT_QUERY, [username, vocation, level, password]);
  const [result] = await connection.execute<RowDataPacket[] & TUser[]>(SELECT_QUERY, [insertId]);

  return result;
};

const find = async ({ username, password }: Partial<TUser>) => {
  const FIND_QUERY = 'SELECT * FROM Trybesmith.users WHERE username =? and password =?';
  const [result] = await connection.execute(FIND_QUERY, [username, password]);
  return result as TUser[];
};

export default {
  set,
  find,
};
