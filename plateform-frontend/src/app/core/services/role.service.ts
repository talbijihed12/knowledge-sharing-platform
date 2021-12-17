import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/role.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private api: string = environment.urlBackend + 'role/';

  constructor(private http: HttpClient) {}

  getListRole() {
    return this.http.get<Role[]>(this.api + 'list-role');
  }
}
