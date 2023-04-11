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
    name: ['', [Validators.required]],
    code: ['', [Validators.pattern('^[a-zA-Z0-9\s]*$')]],
    taxCode: ['', [Validators.required, Validators.pattern('^[0-9]{10}-[0-9]{3}$')]],
    shortName: [''],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    representative: ['', [Validators.required]],
    position: ['', [Validators.required]],
    size: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
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

  openAddModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true }).result.then((result) => {

    })
  }
}
