import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/auth/user';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: User;
  tickets: Ticket[] = [];

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ticketService
      .findAll()
      .subscribe((tickets) => (this.tickets = tickets));

    this.route.paramMap
      .pipe(
        map((params) => +params.get('id')),
        switchMap((id) => this.userService.find(id)),
        map((user) => {
          return {
            ...user,
          };
        })
      )
      .subscribe((user) => (this.user = user));
    //.subscribe((user) => console.log(user));
  }
}
