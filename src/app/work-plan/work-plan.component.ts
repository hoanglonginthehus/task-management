import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { WorkPlanService } from '../work-plan.service';

@Component({
  selector: 'app-work-plan',
  templateUrl: './work-plan.component.html',
  styleUrls: ['./work-plan.component.scss']
})
export class WorkPlanComponent {
  planList: any[] = [];
  empList: any[] = [];
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

  constructor(private workPlanService: WorkPlanService, private fb: FormBuilder, private modalService: NgbModal, private empService: EmployeeService) {
    this.empService.getAllNameOfEmpLoyee().subscribe(empList => {
      this.empList = empList
    });
  }

  filterForm: FormGroup = this.fb.group({
    name: [''],
    project: [''],
    module: [''],
    item: [''],
    priority: [''],
    executer: ['']
  });

  filter(): void {
    const filterValue = this.filterForm.value;
    this.workPlanService.filterWorkPlan(filterValue.name, filterValue.project, filterValue.module, filterValue.item, filterValue.priority, filterValue.executer).subscribe(res => {
      this.planList = res;
    })
  }

  ngOnInit(): void {
    this.planList = [];
    this.workPlanService.getWorkPlanList().subscribe(response => {
      this.planList = response;
    })
  }


}
