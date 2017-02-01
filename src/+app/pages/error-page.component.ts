import { Component } from '@angular/core';

@Component({
  styles: [`
    .white-page {
      background: #fff;
      width: 100%;
    }
   `],
  selector: 'projects',
  template: require("./error_page.pug")
})

export class ErrorPage {
  componentName: "ErrorPage";
}
