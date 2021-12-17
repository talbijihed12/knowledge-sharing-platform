import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { VoteService } from 'src/app/core/services/vote.service';
import { CommentModel } from '../../models/comment.model';
import { VoteType } from '../../models/enums/vote-type';
import { VotePayload } from '../../models/vote-payload';

@Component({
  selector: 'app-comment-vote-button',
  templateUrl: './comment-vote-button.component.html',
  styleUrls: ['./comment-vote-button.component.css']
})
export class CommentVoteButtonComponent implements OnInit {


  @Input() comment: any;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;
  

  constructor(private voteService: VoteService,
    private authService: AuthService,
    private commentService: CommentService, private toastr: ToastrService) {

    this.votePayload = {
      voteType: undefined,
      postId: undefined,
      idComment: undefined,
    }
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvoteComment() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.votecomment();
    this.downvoteColor = '';
  }

  downvoteComment() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.votecomment();
    this.upvoteColor = '';
  }

  private votecomment() {
    this.votePayload.idComment = this.comment.idComment;
    this.voteService.votecomment(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error('You Cannot vote for this post');
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.commentService.getComment(this.comment.idComment).subscribe ( comment => {
      this.comment = comment;
    
    });
  }
}