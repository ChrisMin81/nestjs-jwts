import { IPost } from './post.interface';
import { AppRole } from './appRole';

export interface IUser {
  userId: string;
  username: string;
  email: string;
  password: string;
  roles: AppRole[];
  posts: IPost[];
}

export interface IAdminUser extends Partial<IUser> {
  isAdmin: boolean;
}

export type ICreateUser = Pick<IUser, 'username' | 'email' | 'password'> & {
  passwordConfirmation: string;
};
// export type IUpdateUser = Partial<Omit<IUser, 'userId'>>;
export type IProfileDto = Omit<IUser, 'password'>;
// export type TUser = IUser;
