import { Component, Input, ElementRef } from '@angular/core';
import { DropDownList } from './drop-down-list.component';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Component({
	selector: "user-drop-down-list",
	template: require("./user.pug")
})

export class UserDropDownList extends DropDownList {
	componentName: string = "UserDropDownList";
	public close: boolean = true;
	constructor( protected userService: UserService, protected router: Router, protected elementRef: ElementRef ){
		super( userService, router, elementRef );
	}

	logout(){
    this.userService.logout().subscribe((result) => {
    		this.router.navigate(['/']);
		}, (err)=>{
    		this.router.navigate(['/']);
		});
  }
}
