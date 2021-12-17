import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { CommentSignalButtonComponent } from 'src/app/shared/components/comment-signal-button/comment-signal-button.component';
import { CommentVoteButtonComponent } from 'src/app/shared/components/comment-vote-button/comment-vote-button.component';
import { SignalButtonComponent } from 'src/app/shared/components/signal-button/signal-button.component';
import { VoteButtonComponent } from 'src/app/shared/components/vote-button/vote-button.component';

import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CreateSubplateformeComponent } from './subplateforme/create-subplateforme/create-subplateforme.component';
import { ListSubplateformesComponent } from './subplateforme/list-subplateformes/list-subplateformes.component';

const routes: Routes = [
  
      {
        path: 'vote-button',
        component: VoteButtonComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Comment-vote-button',
        component: CommentVoteButtonComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'signal-button',
        component: SignalButtonComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'comment-signal-button',
        component: CommentSignalButtonComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'view-post/:id',
        component: ViewPostComponent,
        canActivate: [AuthGuard],
      },
      
      { path: 'list-subplateformes', component: ListSubplateformesComponent },
      {
        path: 'create-post',
        component: CreatePostComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-subplateforme',
        component: CreateSubplateformeComponent,
        canActivate: [AuthGuard],
      }
      
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
