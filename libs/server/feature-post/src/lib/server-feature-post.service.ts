import { Injectable, NotFoundException } from '@nestjs/common';
import { IPost } from '@fst/shared/domain';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ServerFeaturePostService {
  private posts$$ = new BehaviorSubject<IPost[]>([
    {
      id: 'something-something-dark-side',
      title: 'Add a route to create post items!',
      description: 'Yes, this is foreshadowing a POST route introduction',
    },
  ]);

  getAll(): IPost[] {
    return this.posts$$.value;
  }

  getOne(id: string): IPost {
    const post = this.posts$$.value.find(td => td.id === id);
    if (!post) {
      throw new NotFoundException(`Post could not be found!`);
    }
    return post;
  }

  create(post: Pick<IPost, 'title' | 'description'>): IPost {
    const current = this.posts$$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new post
    const newPost: IPost = {
      ...post,
      id: `post-${Math.floor(Math.random() * 10000)}`,
    };
    this.posts$$.next([...current, newPost]);
    return newPost;
  }
}
