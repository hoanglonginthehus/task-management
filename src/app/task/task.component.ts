import { Component, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { ProjectService } from '../project.service';
import { ModuleService } from '../module.service';
import { WorkItemService } from '../work-item.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  todo: any[] = [];
  doing: any[] = [];
  done: any[] = [];
  cancel: any[] = [];

  itemList: any[] = [];
  empList: any[] = [];
  projectList: any[] = [];
  moduleList: any[] = [];

  role = localStorage.getItem('role');
  emp3Disable: boolean = this.role!.includes('End') || this.role!.includes('Test');


  addForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    workitem: ['', Validators.required],
    module: ['', Validators.required],
    project: ['', Validators.required],
    typeofwork: ['', Validators.required],
    priority: ['', Validators.required],
    groupofwork: ['', Validators.required],
    emp3: [localStorage.getItem('name'), Validators.required],
    emp4: ['', Validators.required],
    dateStart: [''],
    dateEnd: [''],
    content: ['', Validators.required],
    status: ['', Validators.required],
    note: [''],
    ot: []
  })

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let obj = event.container.data[event.currentIndex];
      let status = '';
      if (event.container.id === 'cdk-drop-list-0') {
        status = 'Pending'
      }
      if (event.container.id === 'cdk-drop-list-1') {
        status = 'Processing'
      }
      if (event.container.id === 'cdk-drop-list-2') {
        status = 'Finish'
      }
      if (event.container.id === 'cdk-drop-list-3') {
        status = 'Cancel'
      }
      this.taskService.changeTaskStatus(obj, status).subscribe(res => {
        console.log(res);
      });
    }
  }

  constructor(private taskService: TaskService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private empService: EmployeeService,
    private projectService: ProjectService,
    private moduleService: ModuleService,
    private itemService: WorkItemService
  ) { }

  ngOnInit(): void {
    this.taskService.getTaskByUsername().subscribe(data => {
      data.forEach((item: any) => {
        if (item.status === "Pending") {
          this.todo.push(item)
        }
        if (item.status === "Processing") {
          this.doing.push(item)
        }
        if (item.status === "Finish") {
          this.done.push(item)
        }
        if (item.status === "Cancel") {
          this.cancel.push(item)
        } if (item.status === "Pause") {
          this.doing.push(item)
        }
      })
    })
  }

  openAddModal(addModal: TemplateRef<any>): void {
    this.empService.getAllNameOfEmpLoyee().subscribe(empList => {
      this.empList = empList
    });
    this.projectService.getAllNameOfProject().subscribe(projectList => {
      this.projectList = projectList
    })
    this.modalService.open(addModal, { centered: true, size: 'lg' }).result.then((result) => {
      const val = this.addForm.value;

      if (result === 'save') {
        try {
          this.taskService.addTask(val.name, val.workitem, val.module, val.project, val.typeofwork, val.priority, val.groupofwork, val.emp3, val.emp4, val.dateStart, val.dateEnd, val.content, val.status, val.note, val.ot).subscribe(() => {
            alert('Thêm mới công việc thành công');
            this.ngOnInit();
          })
          console.log(val);

        } catch (err) {
          console.log(err);
        }
      }
    })
  }

  onChangeProject(val: any) {
    this.moduleService.getAllNameOfModule(val.target.value).subscribe(moduleList => {
      this.moduleList = moduleList;
    })
    this.projectService.filterProject(val.target.value, "", "").subscribe(res => {
      this.addForm.controls['emp4'].setValue(res[0].emp.name);
    })
  }

  onChangeModule(val: any) {
    this.itemService.getAllNameOfItem(val.target.value).subscribe(itemList => {
      this.itemList = itemList;
    })
  }
}
