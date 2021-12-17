import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonRoutingModule } from './common-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    UserProfilComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    CommonRoutingModule,
    ReactiveFormsModule
  ],
})
export class CommonPagesModule {}
