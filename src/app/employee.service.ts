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

  filterEmployee(username: string, name: string, phoneNo: string, role: string): Observable<any> {
    return this.http.get(this.employeeAPI + `?username=${username}&name=${name}&phoneNo=${phoneNo}&role=${role}`)
  }

  addEmployee(username: string, password: string, name: string, email: string, phoneNo: string, gender: string, department: string, status: string, role: any[]): Observable<any> {
    return this.http.post('http://25.6.194.168:8080/api/auth/signup', { username, password, name, email, phoneNo, gender, department, status, role })
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(this.employeeAPI + 'list/' + id)
  }

  updateEmployee(id: number, username: string, name: string, email: string, phoneNo: string, gender: string, department: string, status: string, role: any[]): Observable<any> {
    return this.http.put(this.employeeAPI + 'form/' + id, {username, name, email, phoneNo, gender, department, status, role})
  }

  getAllNameOfEmpLoyee(): Observable<any> {
    return this.http.get(this.employeeAPI + 'list/name')
  }
}
