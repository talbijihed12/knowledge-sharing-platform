import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { UpdateComponent } from './update/update.component';

import { UserProfilComponent } from './user-profil/user-profil.component';

const routes: Routes = [
  
      {
        path: 'user-profile/:name',
        component: UserProfilComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'common/update',
        component: UpdateComponent,
        canActivate: [AuthGuard],
      },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}
