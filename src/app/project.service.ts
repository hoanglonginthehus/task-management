import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectAPI = 'http://25.6.194.168:8080/api/project/'

  constructor(private http: HttpClient) { }

  getProjectList(): Observable<any> {
    return this.http.get(this.projectAPI + 'list/')
  }

  filterProject(name: string, code: string, partner: string): Observable<any> {
    const filterUrl = this.projectAPI + '?' + 'name=' + name + '&' + 'code=' + code + '&' +'partner=' + partner;
    return this.http.get(filterUrl);
  }
}
