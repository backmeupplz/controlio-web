import { Component, OnInit,  Output, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { AuthService } from '../AuthServices';
import { FormMessageService, GlobalValidator } from '../../FormHelper';

@Component({
  selector: 'signin',
  template: require("./signin_form.pug")
})


@Injectable()
export class SignIn implements OnInit {

	private listMessages: any = {};
	public myForm: FormGroup;
	public submitted: boolean = false;

  public logined: boolean = false;
  private error: string;

	constructor(private _fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private message: FormMessageService) {

		this.listMessages = message.createList(["password", "email"]);
    authService.loggedIn$.subscribe((value)=>{
      this.logined = true;
    });
	}

	ngOnInit() {
    this.myForm = new FormGroup({
        email: new FormControl('', [<any>Validators.required, GlobalValidator.mailFormat]),
        password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
        remember: new FormControl(false),
    });

     this.authService.loggedIn$.subscribe((res)=>{
       console.log("Sign In", res);
     })
	}

	save( data, isValid: boolean) {
    this.submitted = true;
    if( isValid ){
    	let self = this;
		  this.authService.login( data.email, data.password).subscribe((result) => {
	      if (result) {
	      	self.router.navigate(['/profile']);
	      	this.authService.setLoggedIn( true );
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
