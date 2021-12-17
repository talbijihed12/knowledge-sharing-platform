import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePostPayload } from 'src/app/shared/models/create-post-payload';
import { PostModel } from 'src/app/shared/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/posts/', postPayload);
  }

  getPost(id: number): Observable<PostModel>{
    return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + name);
  }
  getPostsBySubplateforme(id: number): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-subplateforme/' + id)
  }
  deleteComment(id: number) {
    return this.http.delete(
      'http://localhost:8080/api/posts/delete/' + id
    );
  }
}
