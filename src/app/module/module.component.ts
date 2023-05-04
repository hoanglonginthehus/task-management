import { Component } from '@angular/core';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent {
  moduleList: any[] = []

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleList = [];
    this.moduleService.getModuleList().subscribe(response => {
      this.moduleList = response;
    })
    
  }
}
