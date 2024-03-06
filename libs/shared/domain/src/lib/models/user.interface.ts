import { IPost } from './post.interface';

export interface IUser {
  userId: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  posts: IPost[];
}

export type ICreateUser = Pick<IUser, 'username' | 'email' | 'password'> & { passwordConfirmation: string };
// export type IUpdateUser = Partial<Omit<IUser, 'userId'>>;
// export type IProfileDto = Omit<IUser, 'password' | 'userId'>;
// export type TUser = IUser;
