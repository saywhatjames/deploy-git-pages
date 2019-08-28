import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri = 'http://192.168.2.21:3000';


  constructor(private http: HttpClient) {
  }

  post(data) {
    console.log(data);
    this.http.post(`${this.uri}/send-email`, data)
      .subscribe(
        res => console.log('Done'),
        error1 => console.log(error1));

  }
}
