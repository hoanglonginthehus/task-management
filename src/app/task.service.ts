import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskAPI = 'http://25.6.194.168:8080/api/work-do/'

  constructor(private http: HttpClient) { }

  getTaskByUsername(): Observable<any> {
    return this.http.get(this.taskAPI + localStorage.getItem('username') + '/all-work-do')
  }

  addTask(name: string, workitem: string, module: string, project: string, typeofwork: string, priority: string, groupofwork: string, emp3: string, emp4: string, dateStart: string, dateEnd: string, content: string, status: string, note: string, ot: string): Observable<any> {
    let overtime = "No";
    if (ot === "1") {
      overtime = "Yes"
    }
    return this.http.post(this.taskAPI + 'form', { name, workitem, module, project, typeofwork, priority, groupofwork, emp3, emp4, dateStart, dateEnd, content, status, note, overtime })
  }

  changeTaskStatus(item: any, status: string): Observable<any> {
    const id = item.id;
    const newObj = {
      'name': item.name,
      'workitem': item.workItem.name,
      'module': item.module_workdo.name,
      'project': item.project_workdo.name,
      'typeofwork': item.type,
      'priority': item.priority,
      'groupofwork': item.group,
      'emp3': item.emp_workdo_3.name,
      'emp4': item.emp_workdo_4.name,
      'dateStart': item.dateStart,
      'dateEnd': item.dateEnd,
      'content': item.content,
      'status': status,
      'note': item.note,
      'ot': item.ot
    }
    console.log(newObj + id);
    return this.http.put(this.taskAPI + 'form/' + id, newObj);
  }
}
