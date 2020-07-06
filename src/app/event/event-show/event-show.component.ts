import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../event';
import { map, switchMap } from 'rxjs/operators';
import { Artist } from 'src/app/artist/artist';
import { ArtistService } from 'src/app/artist/artist.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from 'src/app/ui/ui.service';

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.css'],
})
export class EventShowComponent implements OnInit {
  event: Event;
  artists: Artist[] = [];

  constructor(
    private eventService: EventService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.artistService
      .findAll()
      .subscribe((artists) => (this.artists = artists));

    this.route.paramMap
      .pipe(
        map((params) => +params.get('id')),
        switchMap((id) => this.eventService.find(id)),
        map((event) => {
          return {
            ...event,
            artist: `/api/artists/${(event.artists as Artist).id}`,
          };
        })
      )
      .subscribe((event) => (this.event = event));
  }
}
