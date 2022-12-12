import { Component, Self } from '@angular/core';
import { DirectivesService } from '../directives/services/directives.service';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [DirectivesService],
})
export class EmployeeComponent {
  empName: string = 'Jhair';

  constructor(@Self() private directivesService: DirectivesService) { }
}
