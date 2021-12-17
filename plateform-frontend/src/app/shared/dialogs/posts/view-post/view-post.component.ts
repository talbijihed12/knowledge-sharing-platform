import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CommentService } from 'src/app/core/services/comment.service';
import { CommentPayload } from 'src/app/shared/models/comment-payload';
import { PostModel } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  post: PostModel;
  comments: CommentPayload[];
  toggleable = false;
  commentsLoaded = false;

  constructor(
    private config: DynamicDialogConfig,
    private commentService: CommentService,
    private toastr: ToastrService
  ) {
    this.post = this.config.data.post;
  }

  ngOnInit(): void {
    console.log(this.post);
    setTimeout(() => {
      this.getCommentsForPost();
    }, 2000);
  }
  getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.post.id).subscribe(
      (data) => {
        this.comments = data;
        this.toggleable = true;
        this.commentsLoaded = true;
      },
      (error) => {
        console.log(error);
        
        this.toastr.error('Comments failed to load');
      }
    );
  }

  deleteComment(comment: CommentPayload) {
    console.log(comment);
    this.commentService.deleteComment(comment.idComment).subscribe(
      (result) => {
        this.toastr.success('Comments success to delete');
        this.getCommentsForPost();

      },
      (err) => {
        this.toastr.error('Comments failed to delete');

      }
    );
  }
}
