import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogAction } from 'src/app/shared/models/enums/dialog-action-enum';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.models';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  user: User;
  selectedState: any = null;
  userRoles: Role[];
  states: any[] = [
    { name: 'Arizona', code: 'Arizona' },
    { name: 'California', value: 'California' },
    { name: 'Florida', code: 'Florida' },
    { name: 'Ohio', code: 'Ohio' },
    { name: 'Washington', code: 'Washington' },
  ];
  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private roleService: RoleService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.user = this.config.data.user;
    console.log(this.user);
  }

  ngOnInit(): void {
    this.getListRole();
  }
  getListRole(): void {
    this.roleService.getListRole().subscribe((roles) => {
      this.userRoles = roles;
    });
  }

  submitUpdate() {
    let updateUser: any = {};
    updateUser.username = this.user.username;
    updateUser.roles = this.user.roles.map((role) => {
      return role.name;
    });
    console.log(this.user);
    console.log(updateUser);
    this.userService.updateUserRoles(updateUser).subscribe(
      (result) => {
        console.log(result);
        this.toastr.success('The user has been successfully updated');
        this.ref.close(DialogAction.UPDATE);
      },
      (err) => {
        this.toastr.error('The user has been updated with failure');
      }
    );
  }
}
