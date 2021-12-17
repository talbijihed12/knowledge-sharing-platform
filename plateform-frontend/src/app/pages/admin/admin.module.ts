import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AdminRoutingModule } from './admin-routing.module';


import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import {  MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [
    ListPostsComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    MenubarModule,
    RippleModule
  ],
  providers:[
    MessageService
  ]
})
export class AdminModule { }
