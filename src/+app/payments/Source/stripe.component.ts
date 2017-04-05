import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentsService } from '../PaymentsServices/payments.service';
import { AppConfig } from '../../app.config';

@Component({
	selector: 'stripe',
	template:
	`
  <mh-button
  (click)="openCheckout()"
  title="Add card"
  mods="middle padding common radius margin"
  text-mods="common">
  </mh-button>
`
})


export class Stripe {
  @Input() value: number = 2000;
  @Input() subsciption: number;
	componentName: "Stripe";

  @Output() sourceData = new EventEmitter();
  constructor(private paymentsService: PaymentsService ){}
  openCheckout() {

    let self = this;

    var handler = (<any>window).StripeCheckout.configure({
      key: AppConfig.STRIPE_KEY(),
      locale: 'auto',
      token: function (token: any) {
        self.sourceData.emit( token );
      }
    });

    handler.open({
    	key: AppConfig.STRIPE_KEY(),
      class: "stripe-button",
    	// image: "https://stripe.comassets/documentation/checkout/marketplace.png",
      name: 'Controlio',
      description: 'Subscription',
      // amount: self.value,
      panelLabel: 'Add card',
      locale: "auto",
      label: 'Add card'
    });

  }
}
