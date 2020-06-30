import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event/event.service';
import { Event } from '../event/event';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  event: Event;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    public router: Router,
    public auth: AuthService
  ) {}

  @ViewChild('paypalRef', { static: true }) private paypalRef: ElementRef;
  ngOnInit(): void {
    //on recupere l'id de l'event
    const id = this.route.snapshot.paramMap.get('id');

    //on recupere les données lié a l'event
    this.eventService.find(+id).subscribe((event) => (this.event = event));

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
                  value: this.event.price,
                  currency_code: 'EUR',
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          const order = actions.order.capture();
          console.log(order);
        },
        onError: (error) => {
          console.log(error);
        },
      })
      .render(this.paypalRef.nativeElement);
  }
}
