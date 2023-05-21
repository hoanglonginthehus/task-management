import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {


  list = [
    {
      name: 'Báo cáo tổng hợp',
      icon: '../../assets/icon/dashboard-icon.svg',
      path: 'report'
    },
    {
      name: 'Quản lí chi tiết công việc',
      icon: '../../assets/icon/task-icon.svg',
      path: 'task'
    },
    // {
    //   name: 'Lịch',
    //   icon: '../../assets/icon/calendar-icon.svg',
    // },
    // {
    //   name: 'Hỗ trợ',
    //   icon: '../../assets/icon/help-icon.svg',
    // },
  ]
}
