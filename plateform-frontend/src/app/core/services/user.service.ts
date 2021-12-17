import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api: string = environment.urlBackend + 'user/';

  constructor(private http: HttpClient) {}
  getListUser() {
    return this.http.get<User[]>(this.api + 'listUser');
  }
  deleteUserByID(id: number) {
    return this.http.delete(this.api + 'delete/' + id);
  }

  updateUserRoles(updateUser) {
    return this.http.put(this.api + 'update', updateUser);
  }
}
