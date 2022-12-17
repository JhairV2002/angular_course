import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesComponent } from './directives.component';
import { RoomsModule } from '../rooms/rooms.module';

@NgModule({
  declarations: [DirectivesComponent],
  imports: [CommonModule, RoomsModule],
  exports: [DirectivesComponent],
})
export class DirectivesModule { }
