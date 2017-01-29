import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Component({
	selector: "drop-down-list",
	template: " -- -- -- "
})

export class DropDownList { 
	componentName: string =  "DropDownList";
	public close: boolean = true;
	private setOpen: boolean = false;
 constructor(protected userService: UserService, protected router: Router, protected elementRef: ElementRef){

 }

 	@Input() data: any = null;

  @Output() closedChange = new EventEmitter(true);

  onChanges(newValue) {
    this.closedChange.emit(newValue);
  }

	@Input()
	set open(event: any) {
		if( event == true ) this.setOpen = true;
  }


	@Input()
	set event(event: any) {
		if( event != null && !this.close && !this.setOpen ) this.handleClick(event);
		else if( this.setOpen ){
		 this.close = false;
		 this.setOpen = false;
		}
  }

  handleClick(event){
    //if (!this.elementRef.nativeElement.contains(event.target)){
      this.close = true;
      this.onChanges(true);
    //}
  }
}