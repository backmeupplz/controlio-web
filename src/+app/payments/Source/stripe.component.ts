import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentsService } from './payments.service';

@Component({
	selector: 'stripe',
	template:
	`
  <mh-button
  (click)="openCheckout()"
  title="Add card"
  mods="big padding-big common radius margin"
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
      key: 'pk_test_QUk0bgtsbIfR67SVr0EHnIpx',
      locale: 'auto',
      token: function (token: any) {
        console.log( token );
        self.sourceData.emit( token );
      }
    });

    handler.open({
    	key: "pk_test_QUk0bgtsbIfR67SVr0EHnIpx",
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
