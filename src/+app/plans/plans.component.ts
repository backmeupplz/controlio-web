import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../users/user.service';
import { PaymentsService } from './payments.service';
import { User } from '../users/user.model';
import { Customer } from './customer.model';

@Component({
  selector: 'plans',
  styles: [
  `
  .row-view {
    display: block;
    flex-flow: row;
  }

  .row-view .plan {
    padding: 0;
  }

  .row-view .plan, .row-view .common-block, .row-view .content {
    max-width: 100%;
    background: #fff;
  }
  .row-view .common-block {
    padding-left: 15px;
    display: inline-flex;
    max-width: 100%;
    width: 100%;
  }

  .row-view .common-block .content {
    width: 100%;
  }

  .row-view .content, .row-view .top-block {
    flex-direction: row;
  }

  .row-view .top-block p {
    padding: 0;
    padding-right: 2em;
    line-height: 1;
    text-align: left;
  }

  .row-view .top-block p.price {
    font-size: 1.5em;
  }

  .row-view .top-block p.subtitle {
    line-height: 1.7;
  }

  .row-view .bottom-block {
    padding: 15px 20px;
    border-radius: 0 3px 3px 0;
  }

  .btn.checked {
    opacity: .5;
    color: rgb(174, 174, 174);
  }

  .row-view .bottom-block .btn {
    height: 38px;
  }
  :host .top-block-style {
    border-top: 1px solid #eaeaea;
  }

  .content {
    box-sizing: content-box;
  }

  .plan .common-block {
    background: #fff;
    border-radius: 3px;
  }

  .all-width {
    width: 100%;
  }

  .action .bottom-block {
    padding: 39px;
    margin-top: -15px;
  }

  .action.plan {
    padding-left: 0;
    padding-right: 0;
  }

  .action .common-block {
    margin-top: -15px;
  }

  .action .content {
    padding-top: 15px;
  }

  .plan .top-block p {
    max-width: 100%;
  }
  .plans {
    margin-top: 15px;
  }
  .alert {
    background: #fff;
    padding: 20px 30px;
    margin: 15px 0;
    border-radius: 3px;
    box-shadow: 0px 5px 16px rgba(0,0,0,.2);
  }
  `
  ],
  template: `
    <!--div class="top-block top-block-style">
      <div class="container">
        <div class="f-right-inline">
          <menu-block
            title="Cards"
            url="/cards">
            </menu-block>
        </div>
      </div>
    </div-->
    <div *ngIf="loading" class="container d-flex">
      <h3>Loading ...</h3>
    </div>
    <div *ngIf="card" class="plans container">
      <div class="col-md-3 plan" *ngFor="let plan of plans; let index = index" [ngClass]="{'action': index == 2 }">
        <div class="common-block  all-width">
          <div class="content  all-width">
            <div class="top-block">
              <p class="title col-md-3">{{ plan.title }}</p>
              <p class="subtitle col-md-3">{{ plan.count }} project/month</p>
              <p class="price col-md-3">{{ plan.price > 0 ? plan.price + '$' : 'Free' }}</p>
            </div>
            <div class="bottom-block all-width">
              <button class="btn" [disabled]="isDisabled(plan.id)" (click)="setSubsciption(plan.id)" [ngClass]="{'checked': subsciption == plan.id }">{{ subsciption == plan.id ? 'Purchased' : 'Upgrade' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" *ngIf="!loading">
      <div class="row">
        <div *ngIf="!card" class="col-xs-12 alert">
          <p>Добавьте карту, прежду чем выбрать план</p>
          <stripe class="col-xs-12" [subsciption]="subsciption" (sourceData)="setSource($event)"></stripe>
        </div>
      </div>
      <div class="row all-width jc-fs">
        <div class="col-md-3">
          <div class="card active" *ngIf="card">
            <div class="common-block">
              <div class="content">
                <div class="top-block">
                  <p class="type">{{ card.object }}<span style="float: right"><a class="btn cbutton" routerLink="/cards" routerLinkActive="active" *ngIf="card">Change</a></span></p>
                  <p class="number-card">**** **** **** {{ card.last4 }}</p>
                  <p class="text-card"><span>{{ card.funding }} {{ card.brand }} {{ card.country }}</span><span class="f-right">{{ card.exp_month }} / {{ card.exp_year }}</span></p>
                </div>
              </div>
            </div>
          </div>

          <!-- cards></cards -->
        </div>
      </div>
    </div>
  `,
})

export class Plans {
  componentName: "Plans";
  private plans: any[] = [
    { title: "Trial", "count": 1, price: 0, id: 0 },
    { title: "Five", "count": 5, price: 20, id: 1 },
    { title: "Twenty", "count": 20, price: 50, id: 2, action: true },
    { title: "Fifty", "count": 50, price: 100, id: 3 }
  ];
  isDisabled( planId ){
    return this.subsciption == planId;
  }
  private loading: boolean = true;
  private subsciption: any = 0;
  private source: string;
  private customer: Customer;
  private user: User;
  private card: any | null;
  private loadingSubsciption: boolean[] = [false, false, false, false];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private paymentsService: PaymentsService
  ){}

  setSubsciption(type: number){
    console.log( type )
    if( !this.customer ) return;

    this.loadingSubsciption[type] = true;
    this.paymentsService.setSubscription( type )
                        .subscribe((res)=>{
                         console.log(res);
                          this.subsciption = type;
                          this.loadingSubsciption[type] = false;
                        });
  }


  ngOnInit(){

    this.user = this.userService.getAuthUser();
    this.subsciption = this.user.plan;

    console.log( this.user );
    this.paymentsService.getCustomer( this.user.stripeId ).subscribe((res)=>{

       this.customer = res;
       console.log(this.customer);
       this.card = this.customer.default;

       console.log(this.card)
       this.loading = false;
    }, (err)=>{
      console.log(err);
    })

  }
}
