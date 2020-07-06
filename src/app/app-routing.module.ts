import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PaymentComponent } from './user/payment/payment.component';
import { AccountComponent } from './user/account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';

const routes: Routes = [
  { path: 'home', component: EventComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user/payment/:id',
    component: PaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account/:id',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  { path: 'events/:id', component: EventShowComponent },
  { path: 'update-password/:id', component: UpdatePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
