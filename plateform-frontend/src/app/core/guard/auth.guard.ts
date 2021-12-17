import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/app/shared/models/enums/role-enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRoles();
      const userRoleRoute = route.data.role;
      if (userRoleRoute) {
        const roleAuthorized: RoleEnum[] = userRoleRoute.filter((value) =>
          userRole.includes(value)
        );
        if (roleAuthorized.length === 0) {
          console.log(roleAuthorized);
          this.router.navigateByUrl('/login');
          return false;
        }
      }
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
