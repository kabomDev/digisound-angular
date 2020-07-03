import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated() {
    return window.localStorage.getItem('token') !== null;
  }

  logout() {
    window.localStorage.removeItem('token');
  }

  authenticate(credentials: Credentials) {
    return this.http
      .post(environment.apiUrl + '/login_token', credentials)
      .pipe(
        tap((data: { token: string }) => {
          window.localStorage.setItem('token', data.token);
        })
      );
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  getUser() {
    return window.localStorage.getItem('currentUser');
  }

  getId() {
    return window.localStorage.getItem('id');
  }

  getDecodeAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }
}

export interface Credentials {
  username: string;
  password: string;
}
