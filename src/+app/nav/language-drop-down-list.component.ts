import { Component, Input, ElementRef } from '@angular/core';
import { DropDownList } from './drop-down-list.component';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Component({
	selector: "language-drop-down-list",
	template: require("./language.pug")
})

export class LanguageDropDownList extends DropDownList {
	componentName: "LanguageDropDownList";
	public close: boolean = true;
	constructor( protected userService: UserService, protected router: Router, protected elementRef: ElementRef ){
		super( userService, router, elementRef );
	}

}
