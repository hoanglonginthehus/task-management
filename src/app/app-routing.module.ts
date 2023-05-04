import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { CustomerComponent } from './customer/customer.component';
import { ProjectComponent } from './project/project.component';
import { ModuleComponent } from './module/module.component';
import { WorkItemComponent } from './work-item/work-item.component';
import { WorkPlanComponent } from './work-plan/work-plan.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'task', component: TaskComponent,
      },
    ],
    canActivate:[IsAuthenticatedGuard]
  },
  {
    path: 'employee', component: EmployeeComponent,
    canActivate:[IsAuthenticatedGuard]
  },
  {
    path: 'customer', component: CustomerComponent,
    canActivate:[IsAuthenticatedGuard]
  },
  {
    path: 'project', component: ProjectComponent,
    canActivate:[IsAuthenticatedGuard]
  },
  {
    path: 'module', component: ModuleComponent,
    canActivate:[IsAuthenticatedGuard]
  },
  {
    path: 'work-item', component: WorkItemComponent,
    canActivate:[IsAuthenticatedGuard]
  },
  {
    path: 'work-plan', component: WorkPlanComponent,
    canActivate:[IsAuthenticatedGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
