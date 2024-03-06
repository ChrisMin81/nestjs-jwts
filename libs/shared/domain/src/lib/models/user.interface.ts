export interface IUser {
  userId: string;
  username: string;
  email: string;
  password: string;
}

export type ICreateUser = Pick<IUser, 'username' | 'email' | 'password'> & { passwordConfirmation: string };
export type IUpdateUser = Partial<Omit<IUser, 'userId'>>;
export type IProfileDto = Omit<IUser, 'password' | 'userId'>;
export type IUpsertUser = IUser;
