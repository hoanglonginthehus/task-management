import { Component } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  projectList: any[] = [];

  //Filter Form
  filterForm = {
    'name': "",
    'code': "",
    'partner': "",
  }

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectList = [];
    this.projectService.getProjectList().subscribe(response => {
      this.projectList = response;
    })
  }

  filter(): void {
    this.projectService.filterProject(this.filterForm.name, this.filterForm.code, this.filterForm.partner).subscribe(response => {
      this.projectList = response;
    })
  }
}
