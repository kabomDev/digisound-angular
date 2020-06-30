import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Event } from './event';
import { DomSanitizer } from '@angular/platform-browser';

export interface PaginatedEvents {
  items: Event[];
  total: number;
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) {}

  findAll(page: number = 1) {
    return this.http
      .get<PaginatedEvents>(environment.apiUrl + '/events?page=' + page)
      .pipe(
        map((data) => {
          const paginatedEvents: PaginatedEvents = {
            items: data['hydra:member'] as Event[],
            total: data['hydra:totalItems'],
            page: page,
          };

          return paginatedEvents;
        })
      );
  }

  find(id: number) {
    return this.http.get<Event>(environment.apiUrl + '/events/' + id);
  }

  getPrice(id: number) {
    return this.http.get<Event>(environment.apiUrl + '/events/' + id).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
