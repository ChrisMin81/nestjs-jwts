import { IUser } from './user.interface';

export interface IPost {
  id: string;
  title: string;
  description: string;
  author?: Pick<IUser, 'userId'>;
  isPublished: boolean;
}

export type ICreatePost = Pick<IPost, 'title' | 'description'>;
export type IUpdatePost = Partial<Omit<IPost, 'id'>>;
// export type IUpsertPost = IPost;
