import { Component } from '@angular/core';
import { ModelService } from './shared/model/model.service';

@Component({
  selector: 'main',
  template: require("./main_page.pug"),
})

export class MainPage {
  data: any = {};
  constructor(public model: ModelService) {

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    this.universalInit();
  }

  universalInit() {
    this.model.get('/data.json').subscribe(data => {
      console.log("some!");
      this.data = data;
    });
  }

}
