import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DirectivesService } from 'src/app/directives/services/directives.service';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css'],
})
export class RoomsAddComponent {
  constructor(private roomService: DirectivesService) { }

  successMsg: string = '';

  room: RoomList = {
    roomType: '',
    amenities: '',
    checkinTime: new Date('2022-12-12'),
    checkoutTime: new Date('2022-12-12'),
    photos: 'url',
    price: 0,
    rating: 0,
    roomNumber: '00000',
  };

  AddRoom(roomFrom: NgForm) {
    this.roomService.addRoom(this.room).subscribe((data) => {
      this.successMsg = 'Room Added Succesfully!';
      // reset the state of the form
      // roomFrom.reset();
      // reset only the form values
      roomFrom.resetForm({
        roomType: '',
        amenities: '',
        checkinTime: new Date('2022-12-12'),
        checkoutTime: new Date('2022-12-12'),
        photos: 'url',
        price: 0,
        rating: 0,
        roomNumber: '00000',
      });
    });
  }
}
