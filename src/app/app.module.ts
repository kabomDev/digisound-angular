import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EventComponent } from './event/event.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { ArtistComponent } from './artist/artist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventComponent,
    EventShowComponent,
    ArtistComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
