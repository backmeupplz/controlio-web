import { Component, OnInit,  Output, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../validation/global-validator';

import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { FormMessageService } from '../helpers/form-elements/message.service';

@Component({
  selector: 'signin',
  template: require("./signin_form.pug")
})


@Injectable()
export class SignIn implements OnInit {

	private listMessages: any = {};
  componentName: "SignIn";
	public myForm: FormGroup; // our model driven form
	public submitted: boolean = false; // keep track on whether form is submitted
	public events: any[] = []; // use later to display form changes
  public logined: boolean = false;
  private error: string;
	constructor(private _fb: FormBuilder, private userService: UserService, private router: Router, private message: FormMessageService) {

		this.listMessages = message.createList(["password", "email"]);
    userService.loggedIn$.subscribe(
    value => {
      this.logined = true;
    });
	}

	ngOnInit() {

	    this.myForm = new FormGroup({
	        email: new FormControl('', [<any>Validators.required, GlobalValidator.mailFormat]),
	        password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
	        remember: new FormControl(false),
	    });

	}

	save( data, isValid: boolean) {
	    this.submitted = true;

	    if( isValid ){
	    	let self = this;
			  this.userService.login( data.email, data.password).subscribe((result) => {
		      if (result) {
		      	self.router.navigate(['/projects']);
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
