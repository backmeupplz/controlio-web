import { Component, Input, ElementRef } from '@angular/core';
import { DropDownList } from './drop-down-list.component';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Component({
	selector: "burger-drop-down-list",
	template: require("./burger.pug")
})

export class BurgerDropDownList extends DropDownList {
	componentName: "BurgerDropDownList";
	public close: boolean = true;
	constructor( protected userService: UserService, protected router: Router, protected elementRef: ElementRef ){
		super( userService, router, elementRef );
		this.data = [];
	}
}

