import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Subject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //on cree un observable booleen
  authChanged = new Subject<boolean>();

  constructor(private http: HttpClient) {
    interval(5000).subscribe(() => {
      this.authChanged.next(this.isAuthenticated());
    });
  }

  isAuthenticated() {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const data = jwt_decode(token);

    //retourne vrai si le token et superieur a la date actuelle
    return data.exp * 1000 > Date.now();

    //console.log(jwtDecode(token));
    return window.localStorage.getItem('token') !== null;
  }

  logout() {
    window.localStorage.removeItem('token');
    //on previent qu'on est deco
    this.authChanged.next(false);
  }

  authenticate(credentials: Credentials) {
    return this.http
      .post(environment.apiUrl + '/login_token', credentials)
      .pipe(
        tap((data: { token: string }) => {
          window.localStorage.setItem('token', data.token);
          //on previent qu'on est connecté
          this.authChanged.next(true);
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

  deleteToken() {
    return window.localStorage.setItem('token', '');
  }
}

export interface Credentials {
  username: string;
  password: string;
}
