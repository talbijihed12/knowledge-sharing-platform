import { Component, Input, OnInit } from '@angular/core';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from 'src/app/core/services/post.service';
import { SignalServiceService } from 'src/app/core/services/signal.service';
import { SignalType } from '../../models/enums/signal-type';
import { PostModel } from '../../models/post.model';
import { SignalPayload } from '../../models/signal-payload';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signal-button',
  templateUrl: './signal-button.component.html',
  styleUrls: ['./signal-button.component.css']
})
export class SignalButtonComponent implements OnInit {

  @Input() post: PostModel;
  signalPayload: SignalPayload;
  faBug =  faBug;
  upsignalColor: string;
  isLoggedIn: boolean;
 

  constructor(private signalService: SignalServiceService,
    private authService: AuthService,
    private postService: PostService, private toastr: ToastrService) { 
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
  upsignalPost() {
    this.signalPayload.signalType = SignalType.UPSIGNAL;
    this.signal();
    
  }

  private signal() {Swal.fire({
    title: 'Are You Sure You Want To Report This Post?',
    text: 'You will not be able to recover this Report!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Report it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.signalPayload.postId = this.post.id;
      this.signalService.signal(this.signalPayload).subscribe(() => {
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
    this.postService.getPost(this.post.id).subscribe ( post => {
      this.post = post;
    
    });
  }

    }
