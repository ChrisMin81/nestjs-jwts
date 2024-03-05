export interface IPost {
  id: string;
  title: string;
  description: string;
}

export type ICreatePost = Pick<IPost, 'title' | 'description'>;
export type IUpdatePost = Partial<Omit<IPost, 'id'>>;
export type IUpsertPost = IPost;
