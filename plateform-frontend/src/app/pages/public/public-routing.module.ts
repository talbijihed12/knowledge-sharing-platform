import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewSubplateformeComponent } from './view-subplateforme/view-subplateforme.component';


const routes: Routes = [
  
    
      { path: '', component: HomeComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'view-subplateforme/:id', component: ViewSubplateformeComponent}
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
