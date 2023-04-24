import { Component } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  projectList: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectList = [];
    this.projectService.getProjectList().subscribe(response => {
      this.projectList = response;
    })
  }
}
