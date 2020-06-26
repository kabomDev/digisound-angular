import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Event } from './event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http
      .get<Event>(environment.apiUrl + '/events')
      .pipe(map((data) => data['hydra:member'] as Event[]));
  }

  find(id: number) {
    return this.http.get<Event>(environment.apiUrl + '/events/' + id);
  }
}
