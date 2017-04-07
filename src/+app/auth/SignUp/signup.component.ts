import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator, FormMessageService } from '../../FormHelper';

import { Router } from '@angular/router';
import { AuthService } from '../AuthServices'


@Component({
  selector: 'signup',
  template: require("./signup_form.pug"),
  outputs: ['logined']
})

export class SignUp implements OnInit {
  private listMessages: any = {};
  public myForm: FormGroup;
  public submitted: boolean;
  public logined: boolean = false;
  private error: string;
  constructor(private _fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private message: FormMessageService) {

    this.listMessages = message.createList(["password", "email", "confirm"]);
    authService.loggedIn$.subscribe((value) => {
      this.logined = true;
    });
   }

  ngOnInit() {


    let passwordControl = new FormControl('', [<any>Validators.required, <any>Validators.minLength(6), GlobalValidator.checkPassword]);
    this.myForm = new FormGroup({
        email: new FormControl(this.authService.dataView.email || '', [<any>Validators.required, GlobalValidator.mailFormat]),
        password: passwordControl,
        confirm: new FormControl('', [<any>Validators.required, GlobalValidator.confirm(passwordControl) ])
    });


    this.myForm.valueChanges.subscribe(data => {
      this.authService.dataView = { email: data.email };
    })

  }

  save( data, isValid: boolean) {
    this.submitted = true;
    if( isValid ){
      let self = this;
      this.authService.signup( data.email, data.password, (err,res)=>{
        if(err) return;
          self.router.navigate(['/projects']);
      }).subscribe((result) => {
        if (result) {
          self.router.navigate(['/projects']);
          this.authService.setLoggedIn( true );
        }
      }, (err)=>{
        this.error = err;
      });
    }
  }
}
