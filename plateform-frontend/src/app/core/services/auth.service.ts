import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../../shared/models/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { SignupRequestPayload } from '../../pages/public/signup/signup-request.payload';
import { RoleEnum } from 'src/app/shared/models/enums/role-enum';
import { LoginRequestPayload } from 'src/app/shared/models/login-request.payload';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() currentUser: EventEmitter<LoginResponse> = new EventEmitter();



  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    console.log(signupRequestPayload)
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('currentUser', data);
        this.localStorage.store('token', data.token);
        this.currentUser.emit(data);

        this.loggedIn.emit(true);

        return true;
      }));
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getJwtToken(),
      username: this.getCurrentUser().username
    }
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      refreshTokenPayload)
      .pipe(tap(response => {
      }));
  }

  
  logout() {
    this.loggedIn.emit(false);
    this.currentUser.emit(null);

    this.localStorage.clear('token');
    this.localStorage.clear('currentUser');
  }

  getJwtToken() {
    return this.localStorage.retrieve('token');
  }

  

  getCurrentUser() :LoginResponse{
    return this.localStorage.retrieve('currentUser');
  }

  
  
  

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getRoles(): RoleEnum[] {
    return this.getCurrentUser().roles;
  }
}
