import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RoomList } from '../rooms/rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnChanges, OnDestroy {
  @Input() rooms: RoomList[] | null = [];
  @Input() tableTitle: string = '';
  @Input() price = 0;
  // output is an event
  @Output() roomSelected = new EventEmitter<RoomList>();

  //YOU NEED TO SUBSCRIBE THE EVENT

  selectedRoom = (room: RoomList) => {
    this.roomSelected.emit(room);
  };

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['tableTitle']) {
      this.tableTitle = changes['tableTitle'].currentValue.toUpperCase();
    }
  }
  ngOnDestroy(): void {
    console.log('on destroy is called');
  }
}
