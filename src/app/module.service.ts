import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private moduleAPI = 'http://25.6.194.168:8080/api/module/'

  constructor(private http: HttpClient) { }

  getModuleList(): Observable<any> {
    return this.http.get(this.moduleAPI + 'list/')
  }

  filterModule(name: string, code: string, project: string): Observable<any> {
    const filterUrl = this.moduleAPI + '?' + 'name=' + name + '&' + 'code=' + code + '&' +'project=' + project;
    return this.http.get(filterUrl);
  }

  addModule(name: string, project: string, emp: string, dateStart: string, note: string) {
    return this.http.post(this.moduleAPI + 'form/', {name, project, emp, dateStart, note})
  }

  getAllNameOfModule(project: string): Observable<any> {
    return this.http.get(this.moduleAPI + 'list/name/?project=' + project)
  }
}
