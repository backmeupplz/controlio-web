import { Component } from '@angular/core';

@Component({
  selector: 'main',
  template: require("./main_page.pug"),
})

export class MainPageComponent {
  data: any = {};
  constructor() {}
}
