import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubplateformeModel } from 'src/app/shared/models/subplateforme-response';

@Injectable({
  providedIn: 'root'
})
export class SubplateformeService {

  constructor(private http: HttpClient) { }
getAllSubplateforme(): Observable<Array<SubplateformeModel>>{
  return this.http.get<Array<SubplateformeModel>>('http://localhost:8080/api/subplateforme');
}

createSubplateforme(subplateformeModel: SubplateformeModel):Observable<SubplateformeModel> {
  return this.http.post<SubplateformeModel>('http://localhost:8080/api/subplateforme',subplateformeModel);
}

}

