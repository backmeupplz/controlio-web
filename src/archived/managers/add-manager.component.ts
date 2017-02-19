import { Component, OnInit,  Output, Input, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../validation/global-validator';

import { Router } from '@angular/router';
import { Email } from '../helpers/form-elements/email.component';
import { UserService } from '../users/user.service';

@Component({
  selector: 'add-manager',
  template: require("./add_form.pug")
})


@Injectable()
export class AddManager implements OnInit {
  componentName: "AddProject";
	public myForm: FormGroup;
	private event_click: any;
	public events: any[] = [];

	changeManagers( emails ){
    let obj = this.myForm.value;
    obj.managers = emails;
    this.myForm.setValue( obj );
	}

	@Input()
	set event(event: any) {
    this.event_click = event || null;
  }

	constructor(private _fb: FormBuilder, private userService: UserService ) { }

	ngOnInit() {
    this.myForm = new FormGroup({
      managers: new FormControl('')
    });
	}


	save( data, isValid: boolean) {

		console.log( data, isValid );
    if( isValid ) {
	    data.managers.forEach( email =>{
	    	this.userService.addManager( email ).subscribe((result) => {
	    		console.log( "addManager", result );
	    	});
	    })
	  }

	}
}
