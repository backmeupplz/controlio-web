import { Component, Input } from '@angular/core';

@Component({
	selector: "invalid-message",
	template: `
				<div class="error" *ngIf="errors != null && show">
					<small *ngFor="let error of list" [hidden]="errors[error.name] == null">{{ error.message }}</small>
				</div>
	`
})
export class InvalidErrorMessageComponent {
	private errorList: any[] = [];
	@Input() errors: any;
	@Input() list: any;
	@Input() show: any;
}
