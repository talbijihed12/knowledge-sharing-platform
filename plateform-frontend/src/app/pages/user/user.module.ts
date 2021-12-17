import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CreateSubplateformeComponent } from './subplateforme/create-subplateforme/create-subplateforme.component';
import { ListSubplateformesComponent } from './subplateforme/list-subplateformes/list-subplateformes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from "primeng/radiobutton";
import { CheckboxModule } from "primeng/checkbox";
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [
    CreatePostComponent,
    ViewPostComponent,
    ListSubplateformesComponent,
    CreateSubplateformeComponent,
    
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule,
    EditorModule,
    FlexLayoutModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    DropdownModule,
    CardModule,
    FileUploadModule
  ]
})
export class UserModule {}
