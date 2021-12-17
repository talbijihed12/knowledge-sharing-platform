import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { SignupRequestPayload } from '../../public/signup/signup-request.payload';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initSignUpForm();
  }
  initSignUpForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  signup() {
    if (this.signupForm.valid) {
      this.signupRequestPayload = this.signupForm.value;
      this.authService.signup(this.signupRequestPayload).subscribe(
        () => {
          this.router.navigate(['/login'], {
            queryParams: { registered: 'true' },
          });
        },
        () => {
          this.toastr.error('Registration Failed! Please try again');
        }
      );
    } else {
      this.toastr.error('Registration Failed! Please try again');
    }
  }
}

