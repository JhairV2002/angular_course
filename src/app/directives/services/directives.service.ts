import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { RoomList } from 'src/app/rooms/rooms';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DirectivesService {
  roomList: RoomList[] = [];
  //pipe: modify the data always inside a function and before subscribe
  //shareReplay: rngx operator used when the api call is more than one
  //

  httpHeader = new HttpHeaders({ token: '123213j1j1j' });
  getRooms$ = this.http
    .get<RoomList[]>('/api/rooms', { headers: this.httpHeader })
    .pipe(shareReplay(1));

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log('Service is initialized');
    console.log(this.config.apiEndpoint);
  }

  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms', {});
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>('/api/rooms/1', room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  }
}
