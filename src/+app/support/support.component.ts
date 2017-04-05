import { Component } from '@angular/core';

@Component({
  selector: 'projects',
  styles: [`
    :host {
      padding-bottom: 90px;
    }
    .top-block {
      display: block;
    }
    cn-img {
      width: 64px;
      height: 64px;
      justify-content: center;
    }
  `],
  template: require('./support.component.pug'),
})

export class SupportComponent {
  private title: string = "Support";
  private description: string =
  `If you have any questions or suggestions for
  our platform – Don't hesitate to contact me`;

  constructor(){}
}
