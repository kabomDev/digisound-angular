import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from './ticket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  create(ticket: Ticket) {
    return this.http.post<Ticket>(environment.apiUrl + '/tickets', ticket);
  }
}
