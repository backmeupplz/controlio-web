import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../../FormHelper/validation/global-validator';

import { UserService } from '../UserServices/user.service';
import { UserAuthModel } from '../../auth';

import { UserModel } from '../models/user.model';
import { FileCollection } from '../../Collection';
import { FileModel, FileImageModel } from '../../Files/models';
import { FileUploadService } from '../../FileUploader';

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

  private id: string;

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
    private userAuth: UserAuthModel,
    private fileUploadService: FileUploadService) {}

  ngOnInit(){
    this.userService.getProfile().subscribe((result) => {
      this.user = result;
      this.userAuth.setUser(result);
      this.id = this.userAuth.id;
    })

    let collection = new FileCollection<FileModel>()
    if(this.userAuth.photo) collection.push(new FileImageModel(this.userAuth.photo, null, true))

    this.myForm = new FormGroup({
        name: new FormControl(this.userAuth.name),
        phone: new FormControl(this.userAuth.phone),
        photo: new FormControl(collection),
    });
  }

  saveRequest (id: string, data: any) {
    this.userService.editProfile( data.name, data.phone, data.photo ).subscribe((result) => {
      if( result instanceof UserModel ){
        if(this.userAuth.id == id) this.userAuth.setUser(result)
      }
    });
  }


  save( _data, isValid: boolean) {
    if( isValid ) {
      let data = {
        name: _data.name,
        phone: _data.phone,
        photo: ""
      }

      if(_data.photo.length <= 0 ){
        this.saveRequest(this.id, data);
      } else {
        let itemsProcessed = 0;
        let count = 1;
        let photo = "";
        _data.photo.forEach((file: FileModel)=>{
          if(file.isUploaded) {
            itemsProcessed++;
            photo = file.key;
            if(count == itemsProcessed) {
              data.photo = photo;
              this.saveRequest(this.id, data);
            }
            return file.key;
          }
          file.onFileProgress((err, res)=>{
            itemsProcessed++;
            if(!err) photo = file.key;
            else {
              console.log(err);
            }
            if(count == itemsProcessed) {
              data.photo = photo;
              this.saveRequest(this.id, data);
            }
          },(progress)=>{

          })
          let upload = ()=>{
            this.fileUploadService.uploadOn(file.key, file.file, file.loadFile, file.loadFileProgress)
          }
          upload()
          file.uploadFunc = upload;
          return file.key;
        })
      }
    }
  }
}
