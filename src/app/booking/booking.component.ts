import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
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

  // accesing the form controls or groups

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(private configService: ConfigService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      // add a default value and disable it
      roomId: new FormControl(
        { value: 2, disabled: true },
        { validators: [Validators.required] }
      ),
      // [''] shortcut to new FormControl
      guestEmail: ['', [Validators.required, Validators.email]],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobilenumber: [''],
      guestName: ['', [Validators.required, Validators.minLength(5)]],
      // nesting another form
      address: this.fb.group({
        adressLine1: ['', { validators: [Validators.required] }],
        adressLine2: [''],
        city: ['', { validators: [Validators.required] }],
        state: ['', { validators: [Validators.required] }],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([
        this.fb.group({
          guestName: ['', { validators: Validators.required }],
          age: [''],
        }),
      ]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
    });
  }
  addBooking() {
    // not gives the disabled state
    // console.log(this.bookingForm.value);
    // gives the disabled state
    console.log(this.bookingForm.getRawValue());
    this.bookingForm.reset({
      // add a default value and disable it
      roomId: '2',
      // [''] shortcut to new FormControl
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobilenumber: '',
      guestName: '',
      // nesting another form
      address: {
        adressLine1: '',
        adressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }
  addGuest() {
    this.guests.push(
      this.fb.array([this.fb.group({ guestName: [''], age: [''] })])
    );
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
  //adding a new form control

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl());
  }

  removePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
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
