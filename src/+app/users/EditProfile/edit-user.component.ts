import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../../FormHelper/validation/global-validator';

import { UserService } from '../UserServices/user.service';
import { UserAuthModel } from '../../auth';

import { UserModel } from '../models/user.model';


@Component({
  selector: 'edit-user',
  template: require("./edit_form.pug")
})


export class EditUser {
  componentName: string = "EditUser";
  public myForm: FormGroup;
  public typeWindow: string = "Edit User";
  private imageKey: string;
  private callback_upload: any = null;
  private photoExt = ["png","jpg","jpeg"];
  // private image: ImageModel;
  private isEdit: boolean = true;
  private user: UserModel = new UserModel({"_id":"", "email": ""});
  imageKeyChange( obj ){
    this.imageKey = obj.key;
  }

  @Input()
  set setUser( user: UserModel ){
    if( user ){
     this.user = user;
      let obj = this.myForm.value;
      obj.name = user.name || "";
      obj.phone = user.phone || "";
      // if( user.photo ) this.image = new ImageModel(user.photo, true);
      this.myForm.setValue( obj );
    }
  }

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private userAuth: UserAuthModel) {}

  ngOnInit(){
    this.userService.getProfile().subscribe((result) => {
      this.user = result;
      this.userAuth.setUser(result);
    })

    this.myForm = new FormGroup({
        name: new FormControl(this.userAuth.name),
        phone: new FormControl(this.userAuth.phone)
    });
  }

  save( data, isValid: boolean) {
    data.photo = ""
    if( isValid ) {
      this.userService.editProfile( data.name, data.phone, this.imageKey ).subscribe((result) => {
        if( result instanceof UserModel ){
          this.userAuth.setUser(result)
        }
      });
      // if( this.imageKey ){
      //   data.image = this.imageKey;
      //   this.callback_upload = (err, data)=>{
      //     ;
      //   }
      // }
    }
  }
}
