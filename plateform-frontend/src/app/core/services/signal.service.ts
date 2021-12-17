import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignalPayload } from 'src/app/shared/models/signal-payload';

@Injectable({
  providedIn: 'root'
})
export class SignalServiceService {

  constructor(private http: HttpClient) { }
  signal(signalPayload: SignalPayload): Observable<any> {
    console.log("********************************")
    console.log(signalPayload)
    return this.http.post('http://localhost:8080/api/signal/',signalPayload);
  
  }
  signalComment(signalPayload: SignalPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/signal/comment',signalPayload);
  
  }
  

}
