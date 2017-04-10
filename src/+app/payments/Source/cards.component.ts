import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserAuthModel } from '../../auth';
import { PaymentsService } from '../PaymentsServices/payments.service';
import { UserModel } from '../../users/models/user.model';
import { Customer } from '../models/customer.model';

@Component({
  selector: "cards",
  styles:[`
  .card {
    margin: 0;
    background: #fff;
    padding: 0 20px;
    border-radius: 3px;
  }
  :host .top-block-style {
    border-top: 1px solid #eaeaea;
  }

  :host .container .row {
    margin-top: 2em;
  }

  :host .container {
    margin-bottom: 2em;
  }

  .card {
    margin-bottom: 24px;
  }

  .block-mask {
    bottom: initial;
  }

  .title-line {
    justify-content: space-between;
    display: flex;
  }
  .title-line .buttons {
    display: inline-flex;
  }
  .title-line .buttons button {
    margin-left: 15px;
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
      <div class="container">
        <div class="row jc-fs">

          <div class="col-md-4 col-sm-6 col-xs-12" *ngFor="let card of cards" [ngClass]="{'active': default == card.id }">
            <div class="block-mask block-common-style"></div>
            <div class="card active" *ngIf="card">
              <div class="common-block">
                <div class="content">
                  <div class="top-block">
                    <p class="type title-line">{{ card.object }}<span class="buttons"><button class="btn cbutton" (click)="deleteCard(card)">Remove</button><button (click)="setDefault(card)" class="btn cbutton" [disabled]="default == card.id">{{ default == card.id ? 'Purchased' : 'Checked' }}</button></span></p>
                    <p class="number-card">**** **** **** {{ card.last4 }}</p>
                    <p class="text-card"><span>{{ card.funding }} {{ card.brand }} {{ card.country }}</span><span class="f-right">{{ card.exp_month }} / {{ card.exp_year }}</span></p>
                    <p class="text-card" *ngIf="card.name">Email: {{ card.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="block-mask block-common-style"></div>
            <div class="card active">
              <div class="common-block">
                <div class="content">
                  <div class="top-block">
                    <p class="title-line"><span class="type">New Card</span><span class="buttons"><stripe [subsciption]="subsciption" (sourceData)="setSource($event)"></stripe></span></p>
                    <p class="text-card">Add new card for payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
  `
})

export class Cards {
  componentName: "Plans";
  private cards: any[] = [];
  private source: any;
  private customer: Customer;
  private default: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private user: UserAuthModel,
    private paymentsService: PaymentsService
  ){}

  setDefault( source: any ){
    
    if( !this.user.stripeId || !this.source ) return;

    this.paymentsService.setDefaultPayments( this.user.stripeId, this.source.id ).subscribe((res)=>{
      
      this.source = source;
    }, (err)=>{
      
    })
  }


  setSource( source: any ){
    if( !this.user.stripeId || !source ) return;
    this.paymentsService.setPayments( this.user.stripeId, source.id ).subscribe((res)=>{
      
      this.source = source;
      this.cards.push(res)
    }, (err)=>{
      
    })
  }

  deleteCard( source: any ){
    console.log(this.user, source, !this.user.stripeId || !source)
    if( !this.user.stripeId || !source ) return;
    this.paymentsService.deleteCard( this.user.stripeId, source.id ).subscribe((res)=>{
      let index = this.cards.indexOf(source);
      if( index > -1 ) this.cards.splice(index, 1)
      
    }, (err)=>{
      
    })
  }

  ngOnInit(){
    this.paymentsService.getCustomer( this.user.stripeId ).subscribe((res)=>{
      
      this.customer = res;
      this.cards = this.customer.sources.data;
      this.default = res.default_source;
    })
  }
}
