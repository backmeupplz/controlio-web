import { Component,  Output, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../validation/global-validator';

import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { FormMessageService } from '../helpers/form-elements/message.service';


@Component({
  selector: 'account-recovery',
  template: require("./account_recovery_form.pug")
})

@Injectable()
export class AccountRecovery {
  private listMessages: any = {};
  componentName: "SignIn";
  public myForm: FormGroup;
  public submitted: boolean = false;
  public events: any[] = [];
  public logined: boolean = false;
  private error: string;
  constructor(private _fb: FormBuilder, private userService: UserService, private router: Router, private message: FormMessageService) {

    this.listMessages = message.createList(["email"]);
    userService.loggedIn$.subscribe(
    value => {
      this.logined = true;
    });
  }

  ngOnInit() {

      this.myForm = new FormGroup({
          email: new FormControl('', [<any>Validators.required, GlobalValidator.mailFormat]),
      });

  }

  save( data, isValid: boolean) {
      this.submitted = true;

      if( isValid ){
        let self = this;
        /*
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
        });*/
      }
  }

}

