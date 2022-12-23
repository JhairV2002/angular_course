import { HttpEventType } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { DirectivesService } from '../directives/services/directives.service';
import { HeaderComponent } from '../header/header.component';
import { ConfigService } from '../services/config.service';
import { Room, RoomList } from './rooms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  hotelName: string = 'The best Hotel in the world';
  hiddeRooms: boolean = false;
  numberRooms: number = 20;

  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    this.headerComponent.title = 'Title After View Init';

    console.log(this.headerChildrenComponent);
    this.headerChildrenComponent.first.title = 'first title';
  }

  @ViewChild(HeaderComponent)
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  ngAfterViewChecked(): void { }

  constructor(
    private directivesService: DirectivesService,
    private configService: ConfigService
  ) { }

  subscription!: Subscription;

  roomList: RoomList[] = [];

  // Observable and observer

  error$: Subject<string> = new Subject<string>();

  gerError$ = this.error$.asObservable();

  rooms$ = this.directivesService.getRooms$.pipe(
    catchError((err) => {
      console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.directivesService.getRooms$.pipe(
    map((rooms) => rooms.length)
  );

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    // once the stream is complete
    observer.complete();
    // handle error
    // observer.error("error");
  });

  totalBytes = 0;

  ngOnInit(): void {
    this.stream.subscribe({
      next: (value) => {
        console.log(value);
      },
      complete: () => {
        console.log('complete');
      },
    });

    this.stream.subscribe((data) => {
      console.log(data);
    });

    this.subscription = this.directivesService.getRooms$.subscribe((rooms) => {
      this.roomList = rooms;
    });
    this.directivesService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made');
          break;

        case HttpEventType.ResponseHeader:
          console.log('Request success');
          break;
        case HttpEventType.DownloadProgress:
          this.totalBytes += event.loaded;
          console.log('Request success');
          break;

        case HttpEventType.Response:
          console.log(event.body);

          break;
        default:
          break;
      }
    });
  }

  title: string = 'Rooms Table';
  hidden: boolean = true;
  rooms: Room = {
    totalRooms: 30,
    avalibleRooms: 20,
    bookedRooms: 10,
  };

  selectedRoom!: RoomList;
  selectRoom(room: RoomList) {
    this.selectedRoom = room;
    console.log(room);
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '1',
      roomType: 'Presidential',
      amenities: 'Wifi, Tv, Large Bed',
      checkinTime: new Date('10-12-2022'),
      checkoutTime: new Date('10-12-2022'),
      photos: 'url to a photo',
      price: 200,
      rating: 5,
    };

    this.directivesService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }
  changeTitle() {
    this.title = 'New Table Title';
  }

  toggle() {
    this.hidden = !this.hidden;
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Presidential',
      amenities: 'Wifi, Tv, Large Bed',
      checkinTime: new Date('10-12-2022'),
      checkoutTime: new Date('10-12-2022'),
      photos: 'url to a photo',
      price: 200,
      rating: 5,
    };

    this.directivesService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.directivesService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
