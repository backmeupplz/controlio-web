import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'projects',
  styles: [`
    :host {
      padding-bottom: 90px;
    }
  `],
  template: `
    <div class="container">
      <div class="row">
        <div class="common-block support">
          <div class="block-mask block-common-style"></div>
          <div class="col-md-3 main-photo col-xs-12 col-sm-3">
            <a class="image" [style.background-image]="'url(' + 'assets/Nikita.png' + ')'"></a>
          </div>
          <div class="content col-md-9 col-xs-12 col-sm-9 no-padding-left">
            <div class="top-block">
              <p class="title">{{ title }}</p>
              <p class="description">{{ description }}</p>
              <span class="author no-padding-bottom">
                <img class="photo-mini" src="assets/ava.png">
                <div class="text-block two-line">
                  <p class="username">Nikita Kolmogorov</p>
                  <p class="info">co-founder at Controlio</p>
                </div>
              </span>
            </div>
            <div class="link-block bottom-block row">
              <span class="author col-md-4">
                <img class="photo-mini round-mask" src="assets/telegram.png">
                <div class="text-block two-line">
                  <p class="context">TELEGRAM</p>
                  <p class="info link-style">+1 778 288 1444</p>
                </div>
              </span>
              <span class="author col-md-4">
                <img class="photo-mini round-mask" src="assets/skype.png">
                <div class="text-block two-line">
                  <p class="context">SKYPE</p>
                  <p class="info link-style">backmeupplz</p>
                </div>
              </span>
              <span class="author col-md-4">
                <img class="photo-mini round-mask" src="assets/facebook.png">
                <div class="text-block two-line">
                  <p class="context">FACEBOOK</p>
                  <p class="info link-style">backmeupplz</p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})

export class Support {
  componentName: "Support";
  private title: string = "";
  private description: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){
    this.title = "Support";
    this.description = `If you have any questions or suggestions for our platform – Don't hesitate to contact me`;
  }

}
