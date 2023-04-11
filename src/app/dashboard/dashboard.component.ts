import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private http: HttpClient, public authService: AuthService) { }

  // getList() {
  //   this.http.get("http://25.6.194.168:8080/api/employee/list").subscribe(response => {
  //     console.log(response);
  //   })
  // }
}
