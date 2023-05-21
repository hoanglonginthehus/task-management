import { Component, TemplateRef } from '@angular/core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { EmployeeService } from '../employee.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  empList: any[] = [];

  constructor(private empService: EmployeeService,
    private library: FaIconLibrary,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService) {
    this.library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.empList = [];
    this.empService.getEmployeeList().subscribe(response => {
      this.empList = response;
    })
  }

  filterForm: FormGroup = this.fb.group({
    username: [''],
    name: [''],
    phoneNo: [''],
    role: ['']
  })

  //Add Form
  addForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNo: ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
    gender: ['', Validators.required],
    department: ['IT'],
    status: ['', Validators.required],
    role: ['', [Validators.required]],
  });

  //Update Form
  updateForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNo: ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
    gender: ['', Validators.required],
    department: ['IT'],
    status: ['', Validators.required],
    role: ['', [Validators.required]],
  });

  filter(): void {
    const filterValue = this.filterForm.value;
    this.empService.filterEmployee(filterValue.username, filterValue.name, filterValue.phoneNo, filterValue.role).subscribe(res => {
      this.empList = res;
    })
  }

  openAddModal(addModal: TemplateRef<any>): void {
    if (!(localStorage.getItem('role') === "Admin")) {
      alert("Bạn không có quyền truy cập");
      return;
    }
    this.modalService.open(addModal, { centered: true, size: 'lg' }).result.then((result) => {
      if (result === 'save') {
        const val = this.addForm.value;
        const role = [val.role];
        try {
          this.empService.addEmployee(val.username, val.password, val.name, val.email, val.phoneNo, val.gender, val.department, val.status, role).subscribe(res => {
            window.alert('Đã thêm 1 nhân viên vào hệ thống');
            this.ngOnInit();
          })
        } catch (error) {
          // alert('Khách hàng đã có trong hệ thống.')
          console.log(error);

        }
      }
    })
  }

  openUpdateModal(updateModal: TemplateRef<any>, id: number): void {
    if (!(localStorage.getItem('role') === "Admin")) {
      alert("Bạn không có quyền truy cập");
      return;
    }
    this.empService.getEmployeeById(id).subscribe(data => {
      this.updateForm = this.fb.group({
        username: [data.username, Validators.required],
        name: [data.name, [Validators.required]],
        email: [data.email, [Validators.required, Validators.email]],
        phoneNo: [data.phoneNo, [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
        gender: [data.gender, Validators.required],
        department: ['IT'],
        status: [data.status, Validators.required],
        role: [data.role[0].name, [Validators.required]],
      });
    })
    this.modalService.open(updateModal, { centered: true, size: 'lg' }).result.then((result) => {
      if (result === 'save') {
        if (!this.updateForm.valid) {
          alert('Dữ liệu không hợp lệ');
          return;
        } else {
          const val = this.updateForm.value;
          const role = [val.role];
          this.empService.updateEmployee(id, val.username, val.name, val.email, val.phoneNo, val.gender, val.department, val.status, role).subscribe(response => {
            try {
              window.alert('Đã sửa thông tin nhân viên');
              this.ngOnInit();
            } catch (error) {
              console.log(error);
            }
          })
        }
      }
    })
  }
}
