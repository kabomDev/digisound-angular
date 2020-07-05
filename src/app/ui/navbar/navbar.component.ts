import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.auth.authChanged.subscribe((value) => {
      if (!value && this.isAuthenticated) {
        this.router.navigateByUrl('/login');
      }
      this.isAuthenticated = value;
    });
  }

  handleLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
