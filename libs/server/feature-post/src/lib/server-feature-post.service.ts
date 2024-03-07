import { Injectable, NotFoundException } from '@nestjs/common';
import { IAdminUser, IPost } from '@fst/shared/domain';
import { BehaviorSubject } from 'rxjs';
import { randomUUID } from 'crypto';
import { UpdatePostDto } from '@fst/server/shared';

@Injectable()
export class ServerFeaturePostService {
  private posts$$ = new BehaviorSubject<IPost[]>([
    {
      id: 'something-something-dark-side',
      title: 'Add a route to create post items!',
      description: 'Yes, this is foreshadowing a POST route introduction',
      isPublished: true,
      author: { userId: '18a36358-9882-4ea5-bf3e-2b5852399ba8' },
    },
    {
      id: 'something-something-dark-side',
      title: 'Add a route to create post items!',
      description: 'Yes, this is foreshadowing a POST route introduction',
      isPublished: true,
      author: { userId: '18a36358-9882-4ea5-bf3e-2b5852399ba9' },
    },
    {
      id: 'something-something-dark-side',
      title: 'Add a route to create post items!',
      description: 'Yes, this is foreshadowing a POST route introduction',
      isPublished: false,
      author: { userId: '18a36358-9882-4ea5-bf3e-2b5852399ba9' },
    },
    {
      id: 'something-something-dark-side',
      title: 'Add a route to create post items!',
      description: 'Yes, this is foreshadowing a POST route introduction',
      isPublished: false,
      author: { userId: '18a36358-9882-4ea5-bf3e-2b5852399ba8' },
    },
  ]);

  clearAll() {
    this.posts$$.next([]);
  }

  getAll(user?: IAdminUser): IPost[] {
    return this.posts$$.value.filter(
      (p) => p.isPublished || p.author?.userId == user?.userId || user?.isAdmin
    );
  }

  getOne(id: string, user?: IAdminUser): IPost|null {
    const post = this.posts$$.value.find(
      (p) =>
        p.id === id &&
        (p.isPublished || p.author?.userId === user?.userId || user?.isAdmin)
    );
    if (!post) {
      return null;
    }
    return post;
  }

  create(post: Pick<IPost, 'title' | 'description'>, userId: string): IPost {
    const current = this.posts$$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new post
    const author = userId ? { userId: userId } : undefined;
    const newPost: IPost = {
      ...post,
      isPublished: false,
      id: `${randomUUID()}`,
      author,
    };
    this.posts$$.next([...current, newPost]);
    return newPost;
  }

  update(id: string, data: UpdatePostDto, user: IAdminUser): IPost {
    const current = this.posts$$.value;
    const postIndex = this.posts$$.value.findIndex(
      (p) => (p.id === id && p.author?.userId === user?.userId) || user.isAdmin
    );
    if (postIndex <= -1) {
      throw new NotFoundException(`Post could not be found!`);
    }
    const post = this.posts$$.value[postIndex];
    const newPost: IPost = {
      ...post,
      ...data,
    };
    current[postIndex] = newPost;
    this.posts$$.next([...current]);
    return newPost;
  }

  delete(id: string, user: IAdminUser): IPost {
    const postIndex = this.posts$$.value.findIndex(
      (p) => (p.id === id && p.author?.userId === user?.userId) || user.isAdmin
    );
    if (postIndex <= -1) {
      throw new NotFoundException(`Post could not be found!`);
    }
    let current = this.posts$$.value;
    const postToDelete = current[postIndex];

    current = current.splice(postIndex + 1, 1);
    this.posts$$.next([...current]);

    return postToDelete;
  }
}
