import { Component, Input } from '@angular/core';
import { ErrorCommon } from '../../ErrorHandler';

@Component({
  selector: "error-message",
  template: `
      <small class="error-message" *ngIf="error || message">
      <img src="assets/error-triangle-w.svg">
      <p> {{ (error) ? error.message || message || 'Error!' : message }} </p></small>
  `
})
export class ErrorMessageComponent {
  @Input() message: string;
  private _error: ErrorCommon;
  @Input()
  set error(error: ErrorCommon){
    this._error = error;
  }
  get error(){
    return this._error
  }
}
