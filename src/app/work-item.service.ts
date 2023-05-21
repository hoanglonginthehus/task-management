import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorkItemService {

  private workItemAPI = 'http://25.6.194.168:8080/api/work-item/'

  constructor(private http: HttpClient) { }

  getWorkItemList(): Observable<any> {
    return this.http.get(this.workItemAPI + 'list/')
  }

  filterWorkItem(name: string, project: string, module: string, priority: string, executer: string): Observable<any> {
    return this.http.get(this.workItemAPI + `?name=${name}&project_workitem=${project}&module_workitem=${module}&priority=${priority}&emp_workitem_1=${executer}`)
  }

  addWorkItem(name: string, module: string, project: string, priority: string, emp1: string, emp2: string, dateStart: string, dateEnd: string, content: string, status: string): Observable<any> {
    return this.http.post(this.workItemAPI + 'form', {name, module, project, priority, emp1, emp2, dateStart, dateEnd, content, status})
  }

  getAllNameOfItem(module: string): Observable<any> {
    return this.http.get(this.workItemAPI + 'list/name/?module=' + module)
  }
}
