import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../../FormHelper';
import { UserService, UserModel } from '../../users';
import { ImageModel } from '../../Image';

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
  private image: ImageModel;
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
      // if( user.photo ) this.image = new ImageModel(obj: { user.photo, true });
      this.myForm.setValue( obj );
    }
  }

  constructor(
    private _fb: FormBuilder,
    private userService: UserService) {

      this.myForm = new FormGroup({
          name: new FormControl(''),
          phone: new FormControl('')
      });

  }

  save( data, isValid: boolean) {
    if( isValid ) {
      this.userService.editProfile( data.name, data.phone, this.imageKey ).subscribe((result) => { ; });
      // if( this.imageKey ){
      //   data.image = this.imageKey;
      //   this.callback_upload = (err, data)=>{
      //     ;
      //   }
      // }
    }
  }
}
