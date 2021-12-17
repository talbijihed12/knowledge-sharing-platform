import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from '../shared/models/enums/role-enum';

import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren : () => import('./public/public.module').then(m => m.PublicModule),
      },
      {
        path: 'user',
        loadChildren : () => import('./user/user.module').then(m => m.UserModule),
        data: {
          role: [RoleEnum.USER]
        }
      },
      {
        path: 'admin',
        loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule),
        data: {
          role: [RoleEnum.ADMIN]
        }
      },
      {
        path: 'common',
        loadChildren : () => import('./common-pages/common-pages.module').then(m => m.CommonPagesModule),
        data: {
          role: [RoleEnum.ADMIN,RoleEnum.USER]
        }
      }
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
