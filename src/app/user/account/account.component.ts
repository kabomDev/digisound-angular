import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/auth/user';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import { FormGroup, FormControl } from '@angular/forms';
import { exit, abort } from 'process';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: User;
  tickets: Ticket[] = [];
  submitted = false;

  form = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
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
      .subscribe((user) => {
        (this.user = user), this.form.patchValue(this.user);
      });
    //.subscribe((user) => console.log(user));
  }

  handleSubmit() {
    this.submitted = true;
    this.userService.update({ ...this.form.value, id: this.user.id }).subscribe(
      (user) => {
        this.router.navigateByUrl(`/account/${this.user.id}`);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.violations) {
          for (const violation of error.error.violations) {
            const nomDuChamp = violation.propertyPath;
            const message = violation.message;

            this.form.controls[nomDuChamp].setErrors({
              invalid: message,
            });
          }
          return;
        }
      }
    );
  }
}
