import { Component, OnInit,  Output, Input, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../../FormHelper';
import { FileCollection } from '../../Collection';
import { FileModel } from '../../Files/models';
import { Router } from '@angular/router';
import { ProjectService } from '../../projects/ProjectServices/project.service';
import { FileUploadService } from '../../FileUploader';

@Component({
  selector: 'add-project',
  template: require("./add_form.pug")
})


@Injectable()
export class AddProject implements OnInit {

  private ext: string[] = ['image/jpeg','image/png','image/jpg'];
  public typeWindow: string = "Add Project";
  public myForm: FormGroup;
  public submitted: boolean;
  private imageKey: string;
  private photoExt = ["png","jpg","jpeg"];
  private isEdit: boolean = false;

  imageKeyChange( obj ){
    this.imageKey = obj.key;
  }

  valueChange(user) {
    let obj = this.myForm.value;
    if( user ) {
      let userId = this.users.findIndex( elem => { return elem.id == user.id  });
      obj.manager = user != -1 ? this.users[ userId ].userId : null;
    } else {
      obj.manager = null;
    }
    this.myForm.setValue( obj );
  }

  inputChange( text ){
    let obj = this.myForm.value;
    obj.description = text;
    this.myForm.setValue( obj );
  }


  @Input() users: Array<any> = [];

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService,
    private fileUploadService: FileUploadService) {

  }

  ngOnInit() {
    this.myForm = new FormGroup({
        clientEmails: new FormControl([]),
        managers: new FormControl([]),
        title: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
        description: new FormControl('', [<any>Validators.maxLength(400)]),
        status: new FormControl(''),
        image: new FormControl(new FileCollection<FileModel>())
    });
  }

  save( data: { clientEmails: string[], managerEmail: string, managers: string[], title: string, description: string, status: string, image: any }, isValid: boolean) {
    this.submitted = true;
    if(!data) return;
    if( isValid ) {


      let image = data.image.map((file: FileModel)=>{
        file.onFileProgress((err, res)=>{

        },(progress)=>{

        })
        this.fileUploadService.uploadOn(file.key, file.file, file.loadFile, file.loadFileProgress)
        return file.key;
      })

      if( data.managers ) data.managerEmail = data.managers[0];
      data.image = (image[0]) ? image[0] : ""
      let _data: any = {
        managerEmail: data.managers[0],
        title: data.title,
        clientEmails: data.clientEmails
      }
      if(data.image){
        _data.image = data.image
      }
      if(data.description){
        _data.description = data.description
      }
      if(data.status){
        _data.status = data.status
      }
      this.projectService.create( _data ).subscribe();
    }
  }
}
