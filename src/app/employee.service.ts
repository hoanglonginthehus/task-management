import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeAPI = 'http://25.6.194.168:8080/api/employee/'

  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.employeeAPI + 'list/')
  }
}
