import { Component, OnInit,  Output, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { AuthService } from '../AuthServices';
import { FormMessageService, GlobalValidator } from '../../FormHelper';

@Component({
  styles: [`
    .send-email-message ~ .under-link {
      padding-top: 15px;
    }
  `],
  selector: 'magic',
  template: require("./magic.component.pug")
})


@Injectable()
export class MagicLinkComponent implements OnInit {

  private listMessages: any = {};
  public myForm: FormGroup;
  public submitted: boolean = false;
  private sendEmail: boolean = false;
  private email: string;
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
        email: new FormControl(this.authService.dataView.email || '', [<any>Validators.required, GlobalValidator.mailFormat])
    });

    this.myForm.valueChanges.subscribe(data => {
      this.authService.dataView = { email: data.email };
    })
  }

  save( data, isValid: boolean) {
    this.submitted = true;
    
    if( isValid ){
      let self = this;
      this.authService.magic( data.email).subscribe((result) => {
        
        if (result) {
          this.email = data.email;
          this.sendEmail = true;
        }
      }, (err)=>{
        this.error = err;
      });
    }
  }

}
