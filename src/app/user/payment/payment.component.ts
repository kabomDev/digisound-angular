import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event/event.service';
import { Event } from '../../event/event';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/auth/user';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, AfterViewInit {
  event: Event;
  @Input()
  amount;
  @Input()
  number: 1;
  buyOn = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    public router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    //on recupere l'id de l'event
    const id = this.route.snapshot.paramMap.get('id');

    //on recupere les données lié a l'event
    this.eventService.find(+id).subscribe((event) => (this.event = event));
  }

  @ViewChild('paypalRef', { static: false }) private paypalRef: ElementRef;
  ngAfterViewInit(): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    }

    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'pill',
          label: 'paypal',
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount,
                  currency_code: 'EUR',
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.buyOn = true;
          console.log(order);
          //rediriger
        },
        onError: (error) => {
          console.log(error);
        },
      })
      .render(this.paypalRef.nativeElement);
  }

  change($event) {
    this.amount = this.event.price * $event.target.value;
    console.log(this.amount);
  }
}
