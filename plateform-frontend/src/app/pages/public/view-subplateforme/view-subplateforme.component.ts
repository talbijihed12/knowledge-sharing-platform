import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/core/services/post.service';
import { PostModel } from 'src/app/shared/models/post.model';


@Component({
  selector: 'app-view-subplateforme',
  templateUrl: './view-subplateforme.component.html',
  styleUrls: ['./view-subplateforme.component.css']
})
export class ViewSubplateformeComponent implements OnInit {
  faComments = faComments;
  @Input()
  posts:Array<PostModel>;
  id: number;
  
  

  constructor(private router: Router, private postService : PostService, private activateRoute: ActivatedRoute) { 
    this.id = this.activateRoute.snapshot.params.id;
   };
    

  ngOnInit(): void {
    this.getPostsBySubplateforme()
  }
  private getPostsBySubplateforme(){
  this.postService.getPostsBySubplateforme(this.id).subscribe(post =>
    this.posts = post)
  }
  


 

}
