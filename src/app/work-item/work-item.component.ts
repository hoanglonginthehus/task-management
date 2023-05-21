import { Component, TemplateRef } from '@angular/core';
import { WorkItemService } from '../work-item.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { ProjectService } from '../project.service';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss']
})
export class WorkItemComponent {
  itemList: any[] = [];
  empList: any[] = [];
  projectList: any[] = [];
  moduleList: any[] = [];

  prioritys: any = [
    {
      'name': 'Khẩn cấp',
      'value': 0
    },
    {
      'name': 'Cao',
      'value': 1
    },
    {
      'name': 'Trung bình',
      'value': 2
    },
    {
      'name': 'Thấp',
      'value': 3
    }]

  constructor(private workItemService: WorkItemService, private fb: FormBuilder, private modalService: NgbModal, private empService: EmployeeService, private projectService: ProjectService, private moduleService: ModuleService) {
    this.empService.getAllNameOfEmpLoyee().subscribe(empList => {
      this.empList = empList
    });
    this.projectService.getAllNameOfProject().subscribe(projectList => {
      this.projectList = projectList
    })
  }

  filterForm: FormGroup = this.fb.group({
    name: [''],
    project: [''],
    module: [''],
    priority: [''],
    executer: ['']
  });

  addForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    module: ['', Validators.required],
    project: ['', Validators.required],
    priority: ['', Validators.required],
    emp1: ['', Validators.required],
    emp2: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: [''],
    content: ['', Validators.required],
    status: ['', Validators.required]
  })

  filter(): void {
    const filterValue = this.filterForm.value;
    this.workItemService.filterWorkItem(filterValue.name, filterValue.project, filterValue.module, filterValue.priority, filterValue.executer).subscribe(res => {
      this.itemList = res;
    })
  }

  ngOnInit(): void {
    this.itemList = [];
    this.workItemService.getWorkItemList().subscribe(response => {
      this.itemList = response;
    })
  }

  openAddModal(addModal: TemplateRef<any>): void {
    this.modalService.open(addModal, { centered: true, size: 'lg' }).result.then((result) => {
      const val = this.addForm.value;
      
      if (result === 'save') {
        try {
          this.workItemService.addWorkItem(val.name, val.module, val.project, val.priority, val.emp1, val.emp2, val.dateStart, val.dateEnd, val.content, val.status).subscribe(() => {
            window.alert('Đã thêm mới đầu mục');
            this.ngOnInit();
          })


        } catch (error) {
          console.log(error);

        }
      }
    })
  }

  getModuleList(val: any) {
    this.moduleService.getAllNameOfModule(val.target.value).subscribe(moduleList => {
      this.moduleList = moduleList;
    })
  }
}
