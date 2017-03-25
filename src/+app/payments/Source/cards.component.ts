import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserAuthModel } from '../../auth';
import { PaymentsService } from '../PaymentsServices/payments.service';
import { UserModel } from '../../users/models/user.model';
import { Customer } from '../models/customer.model';

@Component({
  selector: "cards",
  styles:[`

  :host .top-block-style {
    border-top: 1px solid #eaeaea;
  }
  `],
  template: `
    <!--div class="top-block top-block-style">
      <div class="container">
        <div class="f-right-inline col-md-12">
          <menu-block
            title="Plans"
            url="/plans">
            </menu-block>
        </div>
      </div>
    </div-->
      <div class="col-md-12 plan card" *ngFor="let card of cards" [ngClass]="{'active': default == card.id }">
        <div class="common-block">
          <div class="content">
            <div class="top-block">
              <p class="type">{{ card.funding }} {{ card.object }}<span class="float-right"><button class="btn cbutton" [disabled]="default == card.id">{{ default == card.id ? 'Purchased' : 'Checked' }}</button></span></p>
              <p class="number-card">**** **** **** {{ card.last4 }}</p>
              <p class="text-card"><span>{{ card.brand }} {{ card.country }}</span><span class="f-right">{{ card.exp_month }} / {{ card.exp_year }}</span></p>
              <p class="text-card">Email: {{ card.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <stripe class="col-md-6" [subsciption]="subsciption" (sourceData)="setSource($event)"></stripe>
  `
})

export class Cards {
  componentName: "Plans";
  private cards: any[] = [];
  private source: any;
  private customer: Customer;
  private user: UserModel | UserAuthModel;
  private default: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserAuthModel,
    private paymentsService: PaymentsService
  ){}

  setDefault( source: any ){
    this.source = source;
    if( !this.user.stripeId || !this.source ) return;

    this.paymentsService.setDefaultPayments( this.user.stripeId, this.source.id ).subscribe((res)=>{
      ;
    }, (err)=>{

    })
  }


  setSource( source: any ){
    this.source = source;
    if( !this.user.stripeId || !this.source ) return;

    this.paymentsService.setPayments( this.user.stripeId, this.source.id ).subscribe((res)=>{
      ;
    }, (err)=>{

    })
  }


  ngOnInit(){

    this.user = this.userService;
    this.paymentsService.getCustomer( this.user.stripeId ).subscribe((res)=>{
       this.customer = res;
       this.cards = this.customer.sources.data;
       this.default = res.default_source;
       ;
    })

  }
}
