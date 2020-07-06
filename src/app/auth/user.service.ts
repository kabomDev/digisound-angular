import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(user: User) {
    return this.http.post<User>(environment.apiUrl + '/users', user);
  }

  find(id: number) {
    return this.http.get<User>(environment.apiUrl + '/users/' + id);
  }

  update(user: User) {
    return this.http.put<User>(environment.apiUrl + '/users/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete<User>(environment.apiUrl + '/users/' + id);
  }
}
