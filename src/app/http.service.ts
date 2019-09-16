import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri = 'http://localhost:3000';


  constructor(private http: HttpClient) {
  }

  post(data) {
    this.http.post(`${this.uri}/send-email`, data)
      .subscribe(
        res => console.log('Done'),
        error1 => console.log(error1));

  }


}
