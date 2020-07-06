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
import { TicketService } from '../ticket.service';
import { Ticket } from '../../user/ticket';
import { abort } from 'process';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, AfterViewInit {
  event: Event;
  ticket: Ticket;

  @Input()
  quantity = 1;
  amount: number;
  buyOn = false;
  showSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private ticketService: TicketService,
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
        advanced: {
          commit: 'false',
          disable_funding: 'credit',
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          //console.log(order);
          this.saveInBdd(this.event.id, this.event.price, this.quantity);
          if (order.status === 'COMPLETED') {
            this.buyOn = true;
          }
        },
        onError: (error) => {
          console.log(error);
        },
      })
      .render(this.paypalRef.nativeElement);
  }

  change($event) {
    this.quantity = $event.target.value;
    const totalAmount = (
      (Math.round(this.event.price * 100) / 100) *
      this.quantity
    ).toFixed(2);
    this.amount = parseFloat(totalAmount);
    //console.log(this.amount);
    return this.amount;
  }

  saveInBdd(eventId, price, quantity) {
    const eventName = eventId;
    const eventPrice = price;
    const qty = quantity;
    const totalAmount = eventPrice * qty;

    this.ticket = {
      eventName: `/api/events/${eventId}`,
      price: eventPrice,
      quantity: qty,
      amount: totalAmount.toString(),
    };

    this.ticketService.create(this.ticket).subscribe((ticket) => {
      //redirection vers le compte de l'utilisateur
    });
    (error) => console.log(error);
  }
}
