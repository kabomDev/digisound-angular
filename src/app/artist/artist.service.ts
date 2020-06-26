import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from './artist';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http
      .get<Artist[]>(environment.apiUrl + '/artists')
      .pipe(map((data) => data['hydra:member'] as Artist[]));
  }

  find(id: number) {
    return this.http.get<Artist>(environment.apiUrl + '/artists' + id);
  }
}
