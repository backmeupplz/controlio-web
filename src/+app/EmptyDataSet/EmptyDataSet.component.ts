import { Component, OnInit, Input } from '@angular/core';
import { ErrorCommon, ErrorServer, ErrorServerConnect } from '../ErrorHandler';

@Component({
  styles: [`
    :host {
      display: flex;
      max-width: 400px;
      text-align: center;
      padding: 5em 0;
      margin: 0 auto;
    }
    .center-block {
      flex-direction: column;
      display: inline-flex;
      position: relative;
    }

    .title {
      font-size: 2.5em;
    }

    .subtitle {
      font-size: 1.5em;
    }

    img {
      max-width: 7em;
      opacity: .5;
      padding: .5em;
    }

    @media screen and (max-height: 768px) {
      .center-block {
        height: auto;
      }
    }
  }
  `],
  selector: 'empty-data-set',
  template: require('./empty-data-set.component.pug')
})
export class EmptyDataSetComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() title: string;
  private _error: ErrorCommon;
  private image: string;
  @Input()
  set error(error: ErrorCommon){
    this._error = error;
    if(!error) return;
    this.image = "assets/connect.svg";
    if( error instanceof ErrorServer ){
      // картинку что произошла серверная ошибка
    } else if( error instanceof ErrorServerConnect ){
      // картинку с erro connect
      this.image = "assets/connect.svg";
    } else {

    }
  }

  get error(){
    return this._error;
  }
  constructor() {}
  ngOnInit() {}
}
