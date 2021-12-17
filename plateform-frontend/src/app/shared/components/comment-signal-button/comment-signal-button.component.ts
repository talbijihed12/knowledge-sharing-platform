import { Component, Input, OnInit } from '@angular/core';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { SignalServiceService } from 'src/app/core/services/signal.service';
import Swal from 'sweetalert2';
import { CommentModel } from '../../models/comment.model';
import { SignalType } from '../../models/enums/signal-type';
import { SignalPayload } from '../../models/signal-payload';

@Component({
  selector: 'app-comment-signal-button',
  templateUrl: './comment-signal-button.component.html',
  styleUrls: ['./comment-signal-button.component.css']
})
export class CommentSignalButtonComponent implements OnInit {

 
  @Input() comment: any;
  signalPayload: SignalPayload;
  faBug =  faBug;
  upsignalColor: string;
  isLoggedIn: boolean;
 

  constructor(private signalService: SignalServiceService,
    private authService: AuthService,
    private commentService: CommentService, private toastr: ToastrService) { 
      this.signalPayload = {
        signalType: undefined,
        postId: undefined,
        idComment: undefined,
        
      }
      this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    }
  ngOnInit(): void {
    this.updateSignalDetails();
  }
  upsignalComment() {
    this.signalPayload.signalType = SignalType.UPSIGNAL;
    this.signalComment();
    
  }

  private signalComment() {Swal.fire({
    title: 'Are You Sure You Want To Report This Post?',
    text: 'You will not be able to recover this Report!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Report it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.signalPayload.postId = this.comment.postId;
      this.signalPayload.idComment = this.comment.idComment;
      this.signalService.signalComment(this.signalPayload).subscribe(() => {
  this.updateSignalDetails();
}, error => {
  this.toastr.error('You Cannot report for this post');
  throwError(error);
});

      Swal.fire(
        'Deleted!',
        'This Post Has Been Reported.',
        'success'
      )
    
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'This Post Is Not Reported',
        'error'
      )
    }
  })
   
     
   
   }
  

  private updateSignalDetails() {
    this.commentService.getComment(this.comment.idComment).subscribe ( comment => {
      this.comment = comment;
    
    });
  }

    }
