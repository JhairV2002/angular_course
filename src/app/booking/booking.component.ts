import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  // class for the form goup
  bookingForm!: FormGroup;
  // service for build the form (add controls)

  constructor(private configService: ConfigService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      // add a default value and disable it
      roomId: new FormControl({ value: 2, disabled: true }),
      // [''] shortcut to new FormControl
      guestEmail: [''],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobilenumber: [''],
      guestName: [''],
      // nesting another form
      address: this.fb.group({
        adressLine1: [''],
        adressLine2: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
    });
  }
  addBooking() {
    // not gives the disabled state
    // console.log(this.bookingForm.value);
    // gives the disabled state
    console.log(this.bookingForm.getRawValue());
  }
}

export class Booking {
  roomId!: string;
  guestEmail!: string;
  checkinDate!: Date;
  checkoutDate!: Date;
  bookingStatus!: string;
  bookingAmount!: number;
  bookingDate!: Date;
  movileNumber!: string;
  guestName!: string;
  guestAdress!: string;
  guestCity!: string;
  guestState!: string;
  guestCountry!: string;
  guestZipCode!: string;
}
