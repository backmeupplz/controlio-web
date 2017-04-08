import { Component, Input } from '@angular/core';

@Component({
	selector: "invalid-message",
	template: `
	<div class="error" *ngIf="errors != null && show">
		<small [hidden]="!error">
      {{ getStr(error) }}
    </small>
  </div>
	`
})
export class InvalidErrorMessageComponent {
	private errorList: any[] = [];
  getStr(obj: any){
    if(!obj) return '';
    return (obj.message instanceof Object) ? obj.message(this.errors[obj.name]) : obj.message;
  }
  private error: any;
  isFind(error: any){
    if(!error || !this.errors) return false;
    return this.errors[this.error.name]
  }
  private _errors: any;
  get errors(){
    return this._errors;
  }
	@Input()
  set errors(errors: any){
    this._errors = errors;
    this.setError()
  }
  private _list: any;

  setError(){
    if(!this.errors || !this.list) {
      this.error = null
      return;
    }
    for(let error in this.errors){
      this.error = this.list.find((elem)=>{
        return elem.name == error;
      })
      if(this.error) return;
    }
  }
  get list(){
    return this._list;
  }
	@Input()
  set list(list: any){
    this._list = list;
    this.setError()
  }

	@Input() show: boolean = true;
}
