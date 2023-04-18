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
        this.customerService.addCustomer(val.name, val.systemName, val.email, val.phoneNo, val.partner, val. gender, val.note, val.status).subscribe(response => {
          alert('Them khach hang thanh cong');
          this.ngOnInit();
        })
        
      }
    })
  }
}
