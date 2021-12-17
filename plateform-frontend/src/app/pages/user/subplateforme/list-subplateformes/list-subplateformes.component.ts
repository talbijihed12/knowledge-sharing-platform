import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { SubplateformeService } from 'src/app/core/services/subplateforme.service';
import { SubplateformeModel } from 'src/app/shared/models/subplateforme-response';

@Component({
  selector: 'app-list-subplateformes',
  templateUrl: './list-subplateformes.component.html',
  styleUrls: ['./list-subplateformes.component.css']
})
export class ListSubplateformesComponent implements OnInit {
   subplateforme: Array<SubplateformeModel>;
  constructor(private subplateformeService: SubplateformeService) { }

  ngOnInit(): void {
    this.subplateformeService.getAllSubplateforme().subscribe(data =>{
      this.subplateforme = data;
    }, error => {
      throwError(error);
    
    })
  }

}
