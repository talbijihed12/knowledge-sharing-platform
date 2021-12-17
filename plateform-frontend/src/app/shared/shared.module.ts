import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTileComponent } from './components/post-tile/post-tile.component';
import { SubplateformeSideBarComponent } from './components/subplateforme-side-bar/subplateforme-side-bar.component';
import { VoteButtonComponent } from './components/vote-button/vote-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/layout-components/footer/footer.component';
import { HeaderComponent } from './components/layout-components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from './components/layout-components/side-bar/side-bar.component';


import {CardModule} from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { SignalButtonComponent } from './components/signal-button/signal-button.component';
import { FiltrePipe } from './pipes/filtre.pipe';
import { CommentVoteButtonComponent } from './components/comment-vote-button/comment-vote-button.component';
import { CommentSignalButtonComponent } from './components/comment-signal-button/comment-signal-button.component';
import { ViewPostComponent } from './dialogs/posts/view-post/view-post.component';
import { ViewUserComponent } from './dialogs/users/view-user/view-user.component';
import { AddUserComponent } from './dialogs/users/add-user/add-user.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [
    VoteButtonComponent,
    PostTileComponent,
    SubplateformeSideBarComponent,
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
    SignalButtonComponent,
    FiltrePipe,
    CommentVoteButtonComponent,
    CommentSignalButtonComponent,
    ViewPostComponent,
    ViewUserComponent,
    AddUserComponent,
    
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,

    CardModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    FormsModule,
    DynamicDialogModule,
    CheckboxModule,
    RadioButtonModule,
    MultiSelectModule,
    InputTextareaModule,
    PanelModule

  ],
  exports: [
    PostTileComponent,
    VoteButtonComponent,
    SubplateformeSideBarComponent,
    SideBarComponent,
    FooterComponent,
    HeaderComponent,
    CommentVoteButtonComponent,
    CommentSignalButtonComponent,
    
  ],
})
export class SharedModule {}
