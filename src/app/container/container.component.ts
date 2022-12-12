import {
  AfterContentInit,
  Component,
  ContentChild,
  ViewChild,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = 'Rick';
  }
}
