import { Component } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent {
  hotelName: string = 'The best Hotel in the world';
  hiddeRooms: boolean = false;
  numberRooms: number = 20;

  toggle = () => {
    this.hiddeRooms = !this.hiddeRooms;
  };
}
