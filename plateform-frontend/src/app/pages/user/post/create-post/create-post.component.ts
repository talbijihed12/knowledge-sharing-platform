import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { SubplateformeService } from 'src/app/core/services/subplateforme.service';
import { CreatePostPayload } from 'src/app/shared/models/create-post-payload';
import { SubplateformeModel } from 'src/app/shared/models/subplateforme-response';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subplateforme: Array<SubplateformeModel>;
  selectedState: any = null;
  uploadedFiles: any[] = [];

  states: any[] = [
    { name: "Arizona", code: "Arizona" },
    { name: "California", value: "California" },
    { name: "Florida", code: "Florida" },
    { name: "Ohio", code: "Ohio" },
    { name: "Washington", code: "Washington" }
  ];
  constructor(
    private router: Router,
    private postService: PostService,
    private subplateformeService: SubplateformeService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private messageService: MessageService

  ) {}

  ngOnInit(): void {
    this.initCreatePostForm();
    this.initListSubPlateforms();
  }
  initCreatePostForm() {
    this.createPostForm = this.formBuilder.group({
      postName: ['', Validators.required],
      subplateformeName: ['', Validators.required],
      hashtag: ['', Validators.required],
      description: ['', Validators.required],
      
    });
  }
  initListSubPlateforms() {
    this.subplateformeService.getAllSubplateforme().subscribe(
      (data) => {
        this.subplateforme = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  

  createPost() {
    if (this.createPostForm.valid) {
      this.postPayload = this.createPostForm.value;
      this.postService.createPost(this.postPayload).subscribe(
        (data) => {
          this.router.navigateByUrl('/');
        },
        (error) => {
          throwError(error);
          this.toastr.error('Adding Post Failed! Please try again');
        }
      );
    } else {
      this.toastr.error('Adding Post Failed! Please try again');
    }
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
}
