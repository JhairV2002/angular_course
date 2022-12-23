import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { CustomValidator } from './validators/CustomValidator';

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

  constructor(
    private bookingService: BookingService,
    private configService: ConfigService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');
    this.bookingForm = this.fb.group({
      // add a default value and disable it
      roomId: new FormControl(
        { value: roomId, disabled: true },
        { validators: [Validators.required] }
      ),
      // [''] shortcut to new FormControl
      guestEmail: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur', // change(default), submit
        },
      ],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobilenumber: [''],
      guestName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          CustomValidator.ValidateName,
          CustomValidator.ValidateSpecialChar('*'),
        ],
      ],
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
      tnc: new FormControl(false, {
        validators: [Validators.requiredTrue, CustomValidator.ValidateDate],
        updateOn: 'blur',
      }),
    });

    this.getBookingData();
    //default behavior: trigger on every key press
    // this.bookingForm.valueChanges.subscribe((data) => this.bookingService.bookRoom(data));
    this.bookingForm.valueChanges
      // map operators
      // .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => console.log(data));
  }

  // api simulation
  //
  // key: form control
  // value: form value

  getBookingData() {
    // need to pass every value for each control
    this.bookingForm.patchValue({
      // [''] shortcut to new FormControl
      guestEmail: 'jag@gmail.com',
      checkinDate: '12/01/2022',
      checkoutDate: '13/01/2022',
      bookingStatus: 'test',
      bookingAmount: '200',
      bookingDate: '13/01/2022',
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
  addBooking() {
    // not gives the disabled state
    // console.log(this.bookingForm.value);
    // gives the disabled state
    console.log(this.bookingForm.getRawValue());
    this.bookingService
      .bookRoom(this.bookingForm.getRawValue())
      .subscribe((data) => {
        console.log(data);
      });
    // this.bookingForm.reset({
    //   // add a default value and disable it
    //   roomId: '2',
    //   // [''] shortcut to new FormControl
    //   guestEmail: '',
    //   checkinDate: '',
    //   checkoutDate: '',
    //   bookingStatus: '',
    //   bookingAmount: '',
    //   bookingDate: '',
    //   mobilenumber: '',
    //   guestName: '',
    //   // nesting another form
    //   address: {
    //     adressLine1: '',
    //     adressLine2: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     zipCode: '',
    //   },
    //   guests: [],
    //   tnc: false,
    // });
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
