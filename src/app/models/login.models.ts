import { IUser } from './user.models';

export interface ILogin {
  username: string;
  password: string;
}

export interface ISessionUser {
  user: IUser;
  token: string;
}