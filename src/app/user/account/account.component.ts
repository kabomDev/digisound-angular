import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/auth/user';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import {
  FormGroup,
  FormControl,
  Validators,
  EmailValidator,
} from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { abort } from 'process';

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
    fullName: new FormControl('', [Validators.required]),
    //email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
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
        this.toastr.success('La modification a bien été prise en compte');
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

  getErrorForControl(controlName: string) {
    return this.form.controls[controlName].getError('invalid');
  }
}
