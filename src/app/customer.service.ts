import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerAPI = 'http://25.6.194.168:8080/api/customer/'

  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<any> {
    return this.http.get(this.customerAPI + 'list/')
  }
}
