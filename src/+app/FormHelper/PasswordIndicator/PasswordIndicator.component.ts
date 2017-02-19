import { Component, OnInit, Input } from '@angular/core';

@Component({
  styles:[`
    .check-password-indicator {
      display: inline-flex;
      padding: 3px 0;
      width: 100%;
    }
    .check-password-indicator span {
      height: 4px;
      width: 25%;
      border-radius: 6px;
      margin: 0 1px;
      background: #d9d9d9;
    }

    .check-password-indicator.very-week span {
      background: #d9d9d9;
    }

    p.very-week {
      color: #939393;
    }
    .check-password-indicator.week span:nth-child(1) {
      background: #ff5d5d;
    }
    p.week {
      color: #ff5d5d;
    }
    .check-password-indicator.so-so span:nth-child(-n+2) {
      background: #f2a51e;
    }
    p.so-so {
      color:  #f2a51e;
    }
    .check-password-indicator.good  span:nth-child(-n+3) {
      background: #76d709;
    }
    p.good {
      color:  #76d709;
    }
    .check-password-indicator.great span {
      background: #05c0ac;
    }
    p.great {
      color:  #05c0ac;
    }
  `],
  selector: 'password-indicator',
  template: require('./PasswordIndicator.component.pug')
})
export class PasswordIndicatorComponent implements OnInit {
  private strongClass: string;
  private strongText: string;
  private _strong: number;

  private errorList: any[] = [];
  @Input() errors: any;
  @Input() list: any;
  @Input() show: any;

  @Input()
  set strong(strong: number){
    if(strong == 4){
      this.strongText = "Great";
      this.strongClass = "great";
    } else if(strong == 3){
      this.strongText = "Good";
      this.strongClass = "good";
    } else if(strong == 2){
      this.strongText = "So so";
      this.strongClass = "so-so";
    } else if(strong == 1){
      this.strongText = "Week";
      this.strongClass = "week";
    } else {
      this.strongText = "Very week";
      this.strongClass = "very-week";
    }

    this._strong = strong;
  }
  constructor() { }
  ngOnInit() { }
}
