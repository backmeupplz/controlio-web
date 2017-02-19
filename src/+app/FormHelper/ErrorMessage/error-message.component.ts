import { Component, Input } from '@angular/core';

@Component({
  selector: "error-message",
  template: `
      <small class="error-message" *ngIf="message">
      <img src="assets/error-triangle-w.svg">
      <p> {{ message }} </p></small>
  `
})
export class ErrorMessageComponent {
  @Input() message: string;
}