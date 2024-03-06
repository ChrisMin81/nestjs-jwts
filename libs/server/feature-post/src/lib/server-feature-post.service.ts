import { Injectable, NotFoundException } from '@nestjs/common';
import { IPost } from '@fst/shared/domain';
import { BehaviorSubject } from 'rxjs';
import { UpdatePostDto } from './dto/post.dto';
import { log } from 'console';
import { randomUUID } from 'crypto';

@Injectable()
export class ServerFeaturePostService {

  private posts$$ = new BehaviorSubject<IPost[]>([
    {
      id: 'something-something-dark-side',
      title: 'Add a route to create post items!',
      description: 'Yes, this is foreshadowing a POST route introduction',
    },
  ]);

  clearAll() {
    this.posts$$.next([]);
  }

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
      id: `${randomUUID()}`,
    };
    this.posts$$.next([...current, newPost]);
    return newPost;
  }

  update(id: string, data: UpdatePostDto): IPost {

    const current = this.posts$$.value;
    const postIndex = this.posts$$.value.findIndex(td => td.id === id);
    if (postIndex <= -1) {
      throw new NotFoundException(`Post could not be found!`);
    }    
    const post = this.posts$$.value[postIndex];
    const newPost: IPost = {
      ...post,
      ...data
    };
    current[postIndex] = newPost
    this.posts$$.next([...current]);
    return newPost;
  }
  delete(id: string): IPost {
    const postIndex = this.posts$$.value.findIndex(td => td.id === id);
    if (postIndex <= -1) {
      throw new NotFoundException(`Post could not be found!`);
    }
    let current = this.posts$$.value;
    const postToDelete = current[postIndex];

    current = current.splice(postIndex+1, 1)    
    this.posts$$.next([...current]);
   
    return postToDelete;
  }
}
