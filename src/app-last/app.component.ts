import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  template: require("template/elements/app.pug")
})
export class AppComponent {}
