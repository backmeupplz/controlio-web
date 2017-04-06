import { Component, Input } from '@angular/core';

@Component({
	selector: "invalid-message",
	template: `
	<div class="error" *ngIf="errors != null && show">
		<small *ngFor="let error of list" [hidden]="errors[error.name] == null">
      {{ getStr(error) }}
    </small>
  </div>
	`
})
export class InvalidErrorMessageComponent {
	private errorList: any[] = [];
  getStr(obj: any){
    return (obj.message instanceof Object) ? obj.message(this.errors[obj.name]) : obj.message;
  }

	@Input() errors: any;
	@Input() list: any;
	@Input() show: boolean = true;
}
