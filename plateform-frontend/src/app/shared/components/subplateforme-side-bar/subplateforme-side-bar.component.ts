import { Component, OnInit } from '@angular/core';
import { SubplateformeService } from 'src/app/core/services/subplateforme.service';
import { SubplateformeModel } from '../../models/subplateforme-response';

@Component({
  selector: 'app-subplateforme-side-bar',
  templateUrl: './subplateforme-side-bar.component.html',
  styleUrls: ['./subplateforme-side-bar.component.css']
})
export class SubplateformeSideBarComponent implements OnInit {

  subplateforme: Array<SubplateformeModel> = [];
  displayViewAll: boolean;

  constructor(private subplateformeService: SubplateformeService) {
    
   }

  ngOnInit(): void {
    this.subplateformeService.getAllSubplateforme().subscribe(data => {
      if (data.length >= 4){
        this.subplateforme = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subplateforme = data;
      }
    });
  }

}
