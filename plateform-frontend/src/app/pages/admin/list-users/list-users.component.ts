import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { error } from 'selenium-webdriver';
import { UserService } from 'src/app/core/services/user.service';
import { ViewUserComponent } from 'src/app/shared/dialogs/users/view-user/view-user.component';
import { DialogAction } from 'src/app/shared/models/enums/dialog-action-enum';
import { User } from 'src/app/shared/models/user.models';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  tableItems;
  users: User[];

  loading = true;
  items: MenuItem[];

  @ViewChild('dt') table: Table;

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private dialogService: DialogService
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
        label: 'USER ID',
        value: 'userId',
      },
      {
        label: 'username',
        value: 'username',
      },
      {
        label: 'Adresse Email',
        value: 'email',
      },
      {
        label: 'Enabled',
        value: 'enabled',
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

    this.primengConfig.ripple = true;
  }

  loadListUser() {
    this.loading = true;
    this.users = [];
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

  showUser(user) {
    console.log('/*********SHOW DIALOG POST*********/');
    const ref = this.dialogService.open(ViewUserComponent, {
      data: { user },
      header: 'User Details',
      contentStyle: {
        'max-height': '500px',
        overflow: 'auto',
        'min-height': '300px',
      },
      width: '50%',
    });
    ref.onClose.subscribe((result: DialogAction) => {
      if (result == DialogAction.UPDATE) {
        this.loadListUser();
      }
    });
  }
}
