import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivesComponent } from './directives/directives.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
// import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: 'rooms',
    component: DirectivesComponent,
  },
  {
    path: 'rooms/add',
    component: RoomsAddComponent,
  },
  {
    path: 'rooms/:id',
    component: RoomsBookingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
