import usersModel from '../models/users.model';
import TUser, { TUserRequest } from '../types/user';
import createToken from '../auth/secret';
import TStatus from '../types/status';

const set = async (user: TUserRequest): Promise<TStatus> => {
  const [{ id, username }]: TUser[] = await usersModel.set(user);

  const token: string = createToken({ id, username });
  return { status: null, message: token };
};

const login = async ({ username, password }: Partial<TUser>) => {
  if (!username) return { status: 400, message: '"username" is required' };
  if (!password) return { status: 400, message: '"password" is required' };

  const [user]: TUser[] = await usersModel.find({ username, password });
  if (!user) return { status: 401, message: 'Username or password invalid' };

  const token: string = createToken(user);
  return { status: null, message: token };
};

export default {
  set,
  login,
};
