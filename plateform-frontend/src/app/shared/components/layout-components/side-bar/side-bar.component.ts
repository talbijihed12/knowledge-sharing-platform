import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routingTable } from 'src/app/core/common/routing.config';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoutingModel } from 'src/app/shared/models/routing.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  routingList:RoutingModel[]=[]
  constructor(private router: Router,private authService: AuthService,) { }

  ngOnInit(): void {
    this.routingList= this.loadRoutingList();
    console.log("/******************/")
    console.log(this.routingList)
  }

  goToCreatePost(){
    this.router.navigateByUrl('/user/create-post');
  }

  goToCreateSubplateforme(){
    this.router.navigateByUrl('/user/create-subplateforme');
  }
  goToPage(routerLink:string){
    this.router.navigateByUrl(routerLink);

  }

  loadRoutingList(){
    const userRole = this.authService.getRoles();
    return routingTable;
  }

}
