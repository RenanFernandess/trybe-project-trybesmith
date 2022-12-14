import usersModel from '../models/users.model';
import TUser, { TUserRequest } from '../types/user';
import createToken from '../auth/secret';
import TStatus from '../types/status';

const set = async (user: TUserRequest): Promise<TStatus> => {
  const [{ id, username }]: TUser[] = await usersModel.set(user);

  const token: string = createToken({ id, username });
  return { status: null, message: token };
};

export default {
  set,
};
