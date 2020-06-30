import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmation: new FormControl(''),
  });

  submitted = false;
  loading = false;
  error = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  getErrorForControl(controlName: string) {
    return this.form.controls[controlName].getError('invalid');
  }

  handleSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = false;

    this.userService.create(this.form.value).subscribe(
      (user) => {
        this.router.navigateByUrl('/login');
      },
      (error: HttpErrorResponse) => {
        this.loading = false;

        if (error.status === 400 && error.error.violations) {
          console.table(error.error.violations);
          for (const violation of error.error.violations) {
            const nomDuChamp = violation.propertyPath;
            const message = violation.message;

            this.form.controls[nomDuChamp].setErrors({
              invalid: message,
            });
          }
          this.error = false;
          return;
        }
        this.error = true;
      }
    );
  }
}
