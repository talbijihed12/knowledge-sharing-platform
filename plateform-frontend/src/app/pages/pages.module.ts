import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { PostTileComponent } from '../shared/components/post-tile/post-tile.component';



@NgModule({
  declarations: [
    LayoutComponent,
    
    
        
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    NgbModule,
    CardModule,
    
  ],
  exports: [
    PostTileComponent,
    
  ]
})
export class PagesModule { }
