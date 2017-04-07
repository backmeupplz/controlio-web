import { Component, OnInit,  Output, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../AuthServices';
import { FormMessageService, GlobalValidator } from '../../FormHelper';

@Component({
  styles: [`
    .login-magic {
      flex-direction: column;
      position: absolute;
      /* max-width: 400px; */
      /* max-height: 300px; */
      background: #fff;
      opacity: .9;
      top: 0;
      justify-content: center;
      align-items: center;
      font-size: 2em;
      display: inline-flex;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
    }

    .login-magic svg-icon {
      width: 3em;
      height: 2em;
      margin-bottom: .5em;
    }
  `],
  selector: 'signin',
  template: require("./signin_form.pug")
})


@Injectable()
export class SignIn implements OnInit {

  private isLoadingMagicLink: boolean = false;
  private listMessages: any = {};
  public myForm: FormGroup;
  public submitted: boolean = false;

  public logined: boolean = false;
  private error: string;

  constructor(private _fb: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private message: FormMessageService) {

    this.listMessages = message.createList(["password", "email"]);
    authService.loggedIn$.subscribe((value)=>{
      this.logined = true;
    });
  }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      if(params['token']){
        let token = params['token'];
        this.isLoadingMagicLink = true;
        this.authService.magicLogin( token ).subscribe((result) => {
          this.isLoadingMagicLink = false;
          if (result) {
            this.router.navigate(['/profile']);
            this.authService.setLoggedIn( true );
          }
        }, (err)=>{
          this.isLoadingMagicLink = false;
          this.error = err;
        });
      }
    });

    this.myForm = new FormGroup({
        email: new FormControl(this.authService.dataView.email || '', [<any>Validators.required, GlobalValidator.mailFormat]),
        password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
        remember: new FormControl(false),
    });

    this.myForm.valueChanges.subscribe(data => {
      this.authService.dataView = { email: data.email };
    })

    this.authService.loggedIn$.subscribe((res)=>{})
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
        this.error = err;
      });
    }
  }

}
