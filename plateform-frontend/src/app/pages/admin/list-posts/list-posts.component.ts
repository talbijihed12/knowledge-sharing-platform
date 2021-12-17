import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';
import { ViewPostComponent } from 'src/app/shared/dialogs/posts/view-post/view-post.component';
import { PostModel } from 'src/app/shared/models/post.model';
import { User } from 'src/app/shared/models/user.models';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  tableItems;
  users: User[];
  posts: PostModel[];

  loading = true;
  items: MenuItem[];

  @ViewChild('dt') table: Table;

  constructor(
    private postService:PostService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private dialogService: DialogService,
    private toastr: ToastrService

  ) {
    this.items = [
      {
        label: 'Show',
        items: [
          {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
              this.update();
            },
          },
          { label: 'Delete' },
        ],
      },
    ];

    this.tableItems = [
      {
        label: 'Post ID',
        value: 'id',
      },
      {
        label: 'Post Title',
        value: 'postName',
      },
      {
        label: 'Platfrom Name',
        value: 'subplateformeName',
      },
      {
        label: 'Signal Number',
        value: 'signalCount',
      },
      {
        label: 'Comment Number',
        value: 'commentCount',
      },
      {
        label: 'Creation Date',
        value: 'createdDate',
        type: 'date',
      },
      {
        label: 'Creation Date',
        value: 'lastModifiedDate',
        type: 'date',
      },
    ];
  }

  ngOnInit() {
    this.loadListUser();
    this.loadListPosts();
    this.primengConfig.ripple = true;
  }

  loadListUser() {
    this.loading = true;
    setTimeout(() => {
      this.userService.getListUser().subscribe(
        (data) => {
          this.users = data;
          this.loading = false;
          console.log('/********* LIST USERS *****************/');
          console.log(this.users);
        },
        (error) => {
          console.log(error);
        }
      );
    }, 3000);
  }
  loadListPosts() {
    this.loading = true;
    setTimeout(() => {
      this.postService.getAllPosts().subscribe(
        (data) => {
          this.posts = data;
          this.loading = false;
          console.log('/********* LIST USERS *****************/');
          console.log(this.posts);
        },
        (error) => {
          console.log(error);
        }
      );
    }, 3000);
  }
  update() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });
  }

  delete() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Delete',
      detail: 'Data Deleted',
    });
  }

  showPost(post){
    console.log("/*********SHOW DIALOG POST*********/")
    const ref = this.dialogService.open(ViewPostComponent, {
      data:{post},
      header: 'Post Details',
      width: '50%'
  });
  }
  deletePost(post:PostModel){
    console.log(post);
    this.postService.deleteComment(post.id).subscribe(
      (result) => {
        this.toastr.success('Post success to delete');
        this.loadListPosts();
      },
      (err) => {
        this.toastr.error('Post failed to delete');

      }
    );
  }
}
