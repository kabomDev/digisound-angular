import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventShowComponent } from './event/event-show/event-show.component';

const routes: Routes = [
  { path: 'home', component: EventComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'events/:id', component: EventShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
