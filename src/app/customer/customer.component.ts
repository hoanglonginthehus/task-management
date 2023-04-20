import { Component, TemplateRef } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  customerList: any[] = [];

  addForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    systemName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNo: ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
    partner: ['', [Validators.required]],
    gender: ['Male', [Validators.required]],
    note: [''],
    status: ['', [Validators.required]],
  });

  updateForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    systemName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNo: ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
    partner: ['', [Validators.required]],
    gender: ['Male', [Validators.required]],
    note: [''],
    status: ['', [Validators.required]],
  });

  constructor(private customerService: CustomerService,
    private modalService: NgbModal,
    private library: FaIconLibrary,
    private fb: FormBuilder) {
    this.library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.customerList = [];
    this.customerService.getCustomerList().subscribe(response => {
      this.customerList = response;
    })
  }

  openAddModal(addModal: TemplateRef<any>): void {
    this.modalService.open(addModal, { centered: true, size: 'lg' }).result.then((result) => {
      if (result === 'save') {
        const val = this.addForm.value;
        try {
          if (!this.addForm.valid) {
            alert('Dữ liệu không hợp lệ');
            return
          } else {
            this.customerService.addCustomer(val.name, val.systemName, val.email, val.phoneNo, val.partner, val.gender, val.note, val.status).subscribe(response => {
              alert('Thêm khách hàng thành công!');
              this.ngOnInit();
            })
          }

        } catch (error) {
          alert('Khách hàng đã có trong hệ thống.')
        }
      }
    })
  }

  openUpdateModal(updateModal: TemplateRef<any>, id: number) {
    this.customerService.getCustomerById(id).subscribe(data => {
      this.updateForm = this.fb.group({
        name: [data.name, Validators.required],
        systemName: [data.systemName, [Validators.required]],
        email: [data.email, [Validators.required, Validators.email]],
        phoneNo: [data.phoneNo, [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
        partner: [data.partner, [Validators.required]],
        gender: [data.gender, [Validators.required]],
        note: [data.note],
        status: [data.status, [Validators.required]],
      });
    })
    this.modalService.open(updateModal, { centered: true, size: 'lg' }).result.then((result) => {
      if (result === 'save') {
        if (!this.updateForm.valid) {
          alert('Dữ liệu không hợp lệ');
          return;
        } else {
          const val = this.updateForm.value;
          this.customerService.updateCustomer(id, val.name, val.systemName, val.email, val.phoneNo, val.partner, val.gender, val.note, val.status).subscribe(respone => {
            try {
              alert('Đã sửa thông tin khách hàng');
              this.ngOnInit();
            } catch (error) {
              console.log(error);
            }
          })

        }
      }

      // if (result === 'dismiss') {
      //   console.log(this.updateForm.value);
      // }
    })
  }

  openDeleteModal(deleteModal: TemplateRef<any>, id: number) {
    this.modalService.open(deleteModal, { centered: true }).result.then((result) => {
      if (result === 'save') {
        this.customerService.deleteCustomer(id).subscribe(
          (response) => {
            alert('Xóa dữ liệu thành công!');
            this.ngOnInit();
          })
      }
    })

  }

}
