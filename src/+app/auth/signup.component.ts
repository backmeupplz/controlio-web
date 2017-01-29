import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../validation/global-validator';

import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { FormMessageService } from '../helpers/form-elements/message.service';

@Component({
  selector: 'signup',
  template: require("./signup_form.pug"),
  providers: [UserService],
  outputs: ['logined']
})

export class SignUp implements OnInit {

	private listMessages: any = {};


  componentName: "SignUp";
	public myForm: FormGroup; // our model driven form
	public submitted: boolean; // keep track on whether form is submitted
	public events: any[] = []; // use later to display form changes
	public logined: boolean = false;
	private error: string;

	constructor(private _fb: FormBuilder, private userService: UserService, private router: Router, private message: FormMessageService) {

		this.listMessages = message.createList(["password", "email", "confirm"]);
	  userService.loggedIn$.subscribe(
    value => {
      //this.logined.emit(true);
      this.logined = true;
    });
	 }

	ngOnInit() {

	    // the long way
	    let passwordControl = new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]);
	    this.myForm = new FormGroup({
	        email: new FormControl('', [<any>Validators.required, GlobalValidator.mailFormat]),
	        password: passwordControl,
	        confirm: new FormControl('', [<any>Validators.required, GlobalValidator.confirm(passwordControl) ])
	    });

	}

	save( data, isValid: boolean) {
	    this.submitted = true; // set form submit to true

	    // check if model is valid
	    // if valid, call API to save customer
	    console.log( data, isValid);


	    if( isValid ){

	    	let self = this;
			  this.userService.signup( data.email, data.password, (err,res)=>{
			  	if(err) return;
		      	self.router.navigate(['/projects']);
			  }).subscribe((result) => {
			  	console.log(result);
		      if (result) {
		      	this.userService.setLoggedIn( true );
		      }
		    }, (err)=>{
		    	let error = err.json();
		    	let status = !error ? 0 : (error.status) ? error.status : (error.currentTarget) ? error.currentTarget.status : 0;
		    	if( status < 200 ) {
		    		this.error = "Connect to server error";
		    	} else if( status >= 400 && status < 500 ) {
		    		console.log( error );
		    		this.error = error.message;
		    	} else if( status >= 500  ) {
		    		this.error = "Server error";
		    	}
		    });
	    }
	}
}
