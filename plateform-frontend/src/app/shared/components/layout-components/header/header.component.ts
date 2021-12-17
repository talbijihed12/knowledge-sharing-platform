import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuItem } from 'primeng/api';
import { LoginResponse } from 'src/app/shared/models/login-response.payload';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn: boolean;
  currentUser: LoginResponse;
  id: number;
  items: MenuItem[];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    
    this.authService.currentUser.subscribe(
      (data: LoginResponse) => (this.currentUser = data)
    );
    this.authService.loggedIn.subscribe((data: boolean) => {
        this.isLoggedIn = data;
        this.getListNavItems();

      });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    this.getListNavItems();
    console.log('/*****************************/');
  }

 
  getListNavItems() {
    console.log('/*****************************/');

    console.log(this.isLoggedIn);
    this.items = [];
    if (this.isLoggedIn) {
      this.items = [
        {
          label: 'Home Page',
          icon: 'pi pi-fw pi-pencil',
          routerLink: '/',
        },
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          routerLink: '/common/user-profile/'+this.currentUser.username,

        },
        {
          label: 'Update Profile',
          icon: 'pi pi-fw pi-user',
          routerLink: '/common/update/' 

        },
      ];
    } else {
      this.items = [];
    }
  }
  update() {
    this.router.navigateByUrl('/common/update/' + this.id);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
  goHome() {
    this.router.navigateByUrl('/');
  }
}
