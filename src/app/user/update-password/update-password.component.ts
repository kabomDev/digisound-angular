import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../auth/user.service';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/auth/user';
import { HttpErrorResponse } from '@angular/common/http';
import { abort } from 'process';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  user: User;

  form = new FormGroup({
    previousPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmation: new FormControl('', [Validators.required]),
  });

  submitted = false;
  error = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => +params.get('id')),
        switchMap((id) => this.userService.find(id))
      )
      .subscribe((user) => {
        this.user = user;
        //console.log(user);
      });
  }

  handleSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.userService
      .updatePassword({ ...this.form.value, id: this.user.id })
      .subscribe(
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

  getErrorForControl(controlName: string) {
    return this.form.controls[controlName].getError('invalid');
  }
}
