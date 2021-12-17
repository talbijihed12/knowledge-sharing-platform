import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

import { CardModule } from 'primeng/card';
import { ViewSubplateformeComponent } from './view-subplateforme/view-subplateforme.component';


@NgModule({
  declarations: [HomeComponent,LoginComponent,SignupComponent,ViewSubplateformeComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    SharedModule,
    CardModule
  ]
})
export class PublicModule { }
