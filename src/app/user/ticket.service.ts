import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from './ticket';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  create(ticket: Ticket) {
    return this.http.post<Ticket>(environment.apiUrl + '/tickets', ticket);
  }

  findAll() {
    return this.http
      .get<Ticket>(environment.apiUrl + '/tickets')
      .pipe(map((data) => data['hydra:member'] as Ticket[]));
  }
}
