import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private api = 'http://25.6.194.168:8080/api/work-do/'

  constructor(private http: HttpClient) { }

  getDataByTypeOfWork(): Observable<any> {
    return this.http.get(this.api + 'type-of-work')
  }

  getDataByStatus(): Observable<any> {
    return this.http.get(this.api + 'status')
  }
  getDataByGroupOfWork(): Observable<any> {
    return this.http.get(this.api + 'group-of-work')
  }
  getDataByPriority(): Observable<any> {
    return this.http.get(this.api + 'priority')
  }

}
