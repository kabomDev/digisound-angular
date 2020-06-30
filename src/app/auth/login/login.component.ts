import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submitted = false;
  error = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.auth.authenticate(this.form.value).subscribe(
      (user) => {
        this.error = false;
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.error = true;
      }
    );
  }
}
