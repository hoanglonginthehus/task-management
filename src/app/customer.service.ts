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

  addCustomer(name: string, systemName: string, email: string, phoneNo: string, partner: string, gender: string, note: string, status: string): Observable<any> {
    return this.http.post(this.customerAPI + 'form', { name, systemName, email, phoneNo, partner, gender, note, status })
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get(this.customerAPI + id);
  }

  updateCustomer(id: number, name: string, systemName: string, email: string, phoneNo: string, partner: string, gender: string, note: string, status: string): Observable<any> {
    const putUrl = this.customerAPI + 'form/' + id;
    return this.http.put(putUrl, { name, systemName, email, phoneNo, partner, gender, note, status }, {responseType: 'json'})
  }

  filterCustomer(systemName: string, name: string, partner: string): Observable<any> {
    const filterUrl = this.customerAPI + '?' + 'name=' + name + '&' + 'systemName=' + systemName + '&' +'partner=' + partner;
    return this.http.get(filterUrl);
  }

  getAllNameOfCustomer(): Observable<any> {
    return this.http.get(this.customerAPI + 'list/name')
  }
}
