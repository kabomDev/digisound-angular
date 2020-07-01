import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PaymentComponent } from './user/payment/payment.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'home', component: EventComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/payment/:id', component: PaymentComponent },
  { path: 'account/:id', component: AccountComponent },
  { path: 'events/:id', component: EventShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
