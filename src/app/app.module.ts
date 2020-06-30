import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EventComponent } from './event/event.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { ArtistComponent } from './artist/artist.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventComponent,
    EventShowComponent,
    ArtistComponent,
    PaginationComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
