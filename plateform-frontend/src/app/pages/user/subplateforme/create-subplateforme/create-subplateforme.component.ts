import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { SubplateformeService } from 'src/app/core/services/subplateforme.service';
import { SubplateformeModel } from 'src/app/shared/models/subplateforme-response';

@Component({
  selector: 'app-create-subplateforme',
  templateUrl: './create-subplateforme.component.html',
  styleUrls: ['./create-subplateforme.component.css'],
})
export class CreateSubplateformeComponent implements OnInit {
  createSubplateformeForm: FormGroup;
  subplateformeModel: SubplateformeModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(
    private router: Router,
    private subplateformeService: SubplateformeService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initFormCreateSubPlateform();
  }
  initFormCreateSubPlateform() {
    this.createSubplateformeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createSubplateforme() {
    if (this.createSubplateformeForm.valid) {
      this.subplateformeModel = this.createSubplateformeForm.value;
      this.subplateformeService
        .createSubplateforme(this.subplateformeModel)
        .subscribe(
          (_data) => {
            this.router.navigateByUrl('user/list-subplateformes');
          },
          (error) => {
            throwError(error);
            this.toastr.error('Adding Sub Plateforme Failed! Please try again');
          }
        );
    } else {
      this.toastr.error('Adding Sub Plateforme Failed! Please try again');
    }
  }
}
