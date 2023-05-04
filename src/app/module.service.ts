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
}
