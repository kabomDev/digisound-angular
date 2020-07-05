import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.auth.authenticate(this.form.value).subscribe(
      (user) => {
        let tokenInfo = this.auth.getDecodeAccessToken(this.auth.getToken());
        window.localStorage.setItem('currentUser', tokenInfo.fullName);
        window.localStorage.setItem('id', tokenInfo.id);

        this.error = false;
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.error = true;
        this.router.navigateByUrl('/');
      }
    );
  }
}
