import { Component, TemplateRef } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { CustomerService } from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  projectList: any[] = [];
  empList: any[] = [];
  customerList: any[] = [];

  //Filter Form
  filterForm = {
    'name': "",
    'code': "",
    'partner': "",
  }
  //Add Form
  addForm: FormGroup = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    status: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: [''],
    emp: ['', Validators.required],
    customer: ['', Validators.required],
    note: ['']
  })



  constructor(private projectService: ProjectService,
    private fb: FormBuilder,
    private empService: EmployeeService,
    private customerService: CustomerService,
    private modalService: NgbModal) {
    this.empService.getAllNameOfEmpLoyee().subscribe(empList => {
      this.empList = empList
    });
    this.customerService.getAllNameOfCustomer().subscribe(customerList => {
      this.customerList = customerList
    })
  }

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

  openAddModal(addModal: TemplateRef<any>): void {
    this.modalService.open(addModal, { centered: true, size: 'lg' }).result.then((result) => {

      if (result === 'save') {
        const val = this.addForm.value;
        try {
          this.projectService.addProject(val.code, val.name, val.status, val.dateStart, val.dateEnd, val.emp, val.customer, val.note).subscribe(
            () => {
              window.alert('Đã thêm dự án');
              this.ngOnInit();
            })
          console.log(val);

        } catch (error) {
          // alert('Dự án đã có trong hệ thống.')
          console.log(error);

        }
      }
    })
  }
}
