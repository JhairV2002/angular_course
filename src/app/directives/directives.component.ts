import { HttpEventType } from '@angular/common/http';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { Room, RoomList } from '../rooms/rooms';
import { DirectivesService } from './services/directives.service';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css'],
})
export class DirectivesComponent implements OnInit, OnDestroy {
  constructor(private directivesService: DirectivesService) { }

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
