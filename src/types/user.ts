export type TUserRequest = {
  username: string,
  vocation: string,
  level: number,
  password?: string,
};

type TUser = {
  id: number,
} & TUserRequest;

export default TUser;
