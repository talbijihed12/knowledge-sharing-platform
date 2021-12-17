import { Component, Input, OnInit } from '@angular/core';
import {  faComments } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  faComments = faComments;
  @Input()
  posts: PostModel[];
  searchText: string;
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/user/view-post/' + id);
  }
  goToUserPage(post: PostModel){
    this.router.navigateByUrl('/user/' + post.username);
    
  }
}
