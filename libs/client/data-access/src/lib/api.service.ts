import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreatePost, IPost, IUpdatePost, IUpsertPost } from '@fst/shared/domain';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient);

  getAllPostItems(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`/api/posts`);
  }

  getPostById(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`/api/posts/${postId}`);
  }

  createPost(postData: ICreatePost): Observable<IPost> {
    return this.http.post<IPost>(`/api/posts`, postData);
  }

  updatePost(postId: string, postData: IUpdatePost): Observable<IPost> {
    return this.http.patch<IPost>(`/api/posts/${postId}`, postData);
  }

  createOrUpdatePost(postId: string, postData: IUpsertPost): Observable<IPost> {
    return this.http.put<IPost>(`/api/posts/${postId}`, postData);
  }

  deletePost(postId: string): Observable<never> {
    return this.http.delete<never>(`/api/posts/${postId}`);
  }
}
