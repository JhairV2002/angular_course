import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  hotelName: string = 'The best Hotel in the world';
  hiddeRooms: boolean = false;
  numberRooms: number = 20;

  toggle = () => {
    this.hiddeRooms = !this.hiddeRooms;
  };

  ngOnInit(): void {
    console.log(this.headerComponent);
  }

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
}
