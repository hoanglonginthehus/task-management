import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {


  list = [
    {
      name: 'Dashboard',
      icon: '../../assets/icon/dashboard-icon.svg',
    },
    {
      name: 'Task',
      icon: '../../assets/icon/task-icon.svg',
    },
    {
      name: 'Calendar',
      icon: '../../assets/icon/calendar-icon.svg',
    },
    {
      name: 'Help',
      icon: '../../assets/icon/help-icon.svg',
    },
  ]
}
