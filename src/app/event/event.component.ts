import { Component, OnInit } from '@angular/core';
import { Event } from './event';
import { EventService } from './event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { UiService } from '../ui/ui.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  totalItems: number;
  currentPage = 1;
  order: string = 'startDate';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((params) => (params.has('page') ? +params.get('page') : 1)),
        tap((page) => (this.currentPage = page)),
        switchMap((page) => this.eventService.findAll(page))
      )
      .subscribe((paginatedEvents) => {
        this.events = paginatedEvents.items;
        this.totalItems = paginatedEvents.total;
      });
  }

  handlePageChange(page: number) {
    this.router.navigateByUrl('/home?page=' + page);
  }
}
