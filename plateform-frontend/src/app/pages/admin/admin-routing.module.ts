import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  {
    path: 'list-posts',
    component: ListPostsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-users',
    component: ListUsersComponent,
    canActivate: [AuthGuard],
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
