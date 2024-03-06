import { IUser } from "./user.interface";

export interface IPost {
  id: string;
  title: string;
  description: string;
  authorId?: IUser;
  isPublished: boolean;
}

export type ICreatePost = Pick<IPost, 'title' | 'description'>;
export type IUpdatePost = Partial<Omit<IPost, 'id'>>;
export type IUpsertPost = IPost;
