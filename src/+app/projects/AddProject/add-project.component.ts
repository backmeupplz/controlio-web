import { Component, OnInit,  Output, Input, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../../FormHelper';
import { FileCollection } from '../../Collection';
import { FileModel } from '../../Files/models';
import { Router } from '@angular/router';

import { ProjectService } from '../../projects/ProjectServices/project.service';
// import { ImportFileElement } from '../helpers/form-elements/file-upload.component';

@Component({
  selector: 'add-project',
  template: require("./add_form.pug")
})


@Injectable()
export class AddProject implements OnInit {

  public collectionFiles: FileCollection<FileModel> = new FileCollection<FileModel>();
  public myForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  public manager: any = null;
  private event_click: any;
  public typeWindow: string = "Add Project";
  private imageKey: string;
  private callback_upload: any = null;
  private photoExt = ["png","jpg","jpeg"];
  private isEdit: boolean = false;

  private clients: string[] = [];
  private managers: string[] = [];

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

  @Input()
  set event(event: any) {
    this.event_click = event || null;
  }

  @Input() users: Array<any> = [];

  constructor(
    private _fb: FormBuilder,
    // private userService: UserService,
    private router: Router,
    private projectService: ProjectService) {

  }

  ngOnInit() {

    // if( this.userService.isLoggedIn() ){
    //  // this.userService.getAuthUsers().subscribe((result) => {

    //  //    let index = 0;
    //  //    let users = result.map(elem=>{
    //  //      index++;
    //  //      ;
    //  //      return { userId: elem._id, name: ( elem.name || elem.email ), id: index };
    //  //    });

    //  //    ;
    //  //    this.users = users;
    //  //   });

    // }

        this.myForm = new FormGroup({
            clientEmails: new FormControl([]),
            managers: new FormControl([]),
            title: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
            description: new FormControl('', [<any>Validators.maxLength(400)]),
            status: new FormControl(''),
        });

        this.myForm.valueChanges.subscribe(data => {
          ;
          // this.valueChange.emit(data);
          // this.isSetText = data.text.length > 0;
        })
  }

  public managerGet(value){
    ;
  }


  save( data, isValid: boolean) {

    if( data.managers ) data.managerEmail = data.managers[0];
    ;

    this.submitted = true;
    if( isValid ) {

      ;

      if( this.imageKey ){
        data.image = this.imageKey;

        this.callback_upload = (err, data)=>{
          ;
        }

      } else {
        ;
      }

      this.projectService.create( data ).subscribe((result) => {
        ;
      });
    }
  }
}
