import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpApiInterceptor } from './utils/interceptors/httpapi.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageService } from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    
  
    
  
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true,
    },
    MessageService,
    DialogService
  ],
  exports:[]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('You should import core module only in the root module');
    }
  }
}
