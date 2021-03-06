import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { EventComponent } from './event/event.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { ArtistComponent } from './artist/artist.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { AccountComponent } from './user/account/account.component';
import { PaymentComponent } from './user/payment/payment.component';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import { LOCALE_ID } from '@angular/core';

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
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    OrderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
