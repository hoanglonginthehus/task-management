import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorkPlanService {
  private workPlanAPI = 'http://25.6.194.168:8080/api/work-do/'

  constructor(private http: HttpClient) { }

  getWorkPlanList(): Observable<any> {
    return this.http.get(this.workPlanAPI + 'list/')
  }

  filterWorkPlan(name: string, project: string, module: string, item: string, priority: string, executer: string): Observable<any> {
    return this.http.get(this.workPlanAPI + `?&name=${name}&workItem=${item}&module_workdo=${module}&project_workdo=${project}&priority=${priority}&emp_workdo_3=${executer}`)
  }


}
