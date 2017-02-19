import { Component, Input, ElementRef } from '@angular/core';
import { DropDownList } from './drop-down-list.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/AuthServices';

@Component({
	selector: "user-drop-down-list",
	template: require("./user.pug"),
  host: {
    '(document:click)': 'onClick($event)',
  },
})

export class UserDropDownList extends DropDownList {

	constructor( protected authService: AuthService, protected router: Router, protected elementRef: ElementRef ){
		super( elementRef );
	}

	logout(){
    this.authService.logout().subscribe((result) => {
    		this.router.navigate(['/']);
		}, (err)=>{
    		this.router.navigate(['/']);
		});
  }
}
