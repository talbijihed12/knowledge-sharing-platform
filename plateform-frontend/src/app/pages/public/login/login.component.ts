import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginRequestPayload } from 'src/app/shared/models/login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.loginRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.initLoginForm();

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage =
          'Please Check your inbox for activation email ' +
          'activate your account before you Login!';
      }
    });
  }
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  login() {
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      this.loginRequestPayload = this.loginForm.value;

      this.authService.login(this.loginRequestPayload).subscribe(
        (data) => {
          this.isError = false;
          this.router.navigateByUrl('');
          this.toastr.success('Login Successful');
        },
        (error) => {
          this.isError = true;
          throwError(error);
        }
      );
    } else {
      this.isError = true;
    }
  }
}
