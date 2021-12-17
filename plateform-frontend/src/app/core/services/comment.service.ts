import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from 'src/app/shared/models/comment-payload';
import { CommentModel } from 'src/app/shared/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(
      'http://localhost:8080/api/comments/by-post/' + postId
    );
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:8080/api/comments/',
      commentPayload
    );
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>(
      'http://localhost:8080/api/comments/by-user/' + name
    );
  }
  getComment(idComment: number) {
    return this.httpClient.get<CommentModel>(
      'http://localhost:8080/api/comments/' + idComment
    );
  }
  deleteComment(id: number) {
    return this.httpClient.delete(
      'http://localhost:8080/api/comments/delete/' + id
    );
  }
}
