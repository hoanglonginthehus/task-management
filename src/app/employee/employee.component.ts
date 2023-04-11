import { Component } from '@angular/core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { EmployeeService } from '../employee.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  empList: any[] = [];

  constructor(private empService: EmployeeService,
    private library: FaIconLibrary) {
      this.library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.empList = [];
    this.empService.getEmployeeList().subscribe(response => {
      this.empList = response;
    })
  }
}
