import { Component, TemplateRef } from '@angular/core';
import { ModuleService } from '../module.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent {
  moduleList: any[] = []
  projectList: any[] = []

  //Filter form
  filterForm = {
    'name': "",
    'code': "",
    'project': ""
  }

  //Addform
  addForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    project: ['', Validators.required],
    emp: [localStorage.getItem('username')],
    dateStart: ['', Validators.required],
    note: ['']
  })

  constructor(private moduleService: ModuleService, private modalService: NgbModal, private fb: FormBuilder, private projectService: ProjectService) {
    this.projectService.getAllNameOfProject().subscribe(res => {
      this.projectList = res;
    })
  }

  ngOnInit(): void {
    this.moduleList = [];
    this.moduleService.getModuleList().subscribe(response => {
      this.moduleList = response;
    })
  }

  filter(): void {
    this.moduleService.filterModule(this.filterForm.name, this.filterForm.code, this.filterForm.project).subscribe(response => {
      this.moduleList = response;
    })
  }

  openAddModal(addModal: TemplateRef<any>): void {
    this.modalService.open(addModal, { centered: true, size: 'lg' }).result.then((result) => {

      if (result === 'save') {
        const val = this.addForm.value;
        try {
          this.moduleService.addModule(val.name, val.project, val.emp, val.dateStart, val.note).subscribe(() => {
            window.alert('Đã thêm mới module');
            this.ngOnInit();
          })
          console.log(val);
        } catch (error) {
          console.log(error);

        }
      }
    })
  }
}
