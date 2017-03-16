import { Component,  Output, Input, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import { GlobalValidator } from '../validation/global-validator';

// import { UserService } from '../users/user.service';
// import { Email } from '../helpers/form-elements/email.component';
// import { LimitInput } from '../helpers/form-elements/limit.component';
// import { ImportFileElement } from '../helpers/form-elements/file-upload.component';
// import { ProjectService } from './project.service';

// import { ImageModel } from '../helpers/imgb/imgb.model';

@Component({
  selector: 'edit-project',
  template: require("./edit_form.pug")
})


@Injectable()
export class EditProject {
  componentName: "EditProject";
	public myForm: FormGroup;
	public typeWindow: string = "Edit Project";
	public submitted: boolean;
	public events: any[] = [];
	private event_click: any;
	public manager: any = null;
	private imageKey: string;
	private callback_upload: any = null;
	private photoExt = ["png","jpg","jpeg"];
	private description: string = "";
	// private image: ImageModel;
	private isEdit: boolean = true;
	private projectVal: any;
	private clients: string[] = [];
	imageKeyChange( obj ){
		this.imageKey = obj.key;
	}

  valueChange(user) {


    this.manager = user;

    let obj = this.myForm.value;
    if( user ) {
    	let userId = this.users.findIndex( elem => { return elem.id == user.id  });
    	obj.manager = user != -1 ? this.users[ userId ].userId : null;
    } else {
    	obj.manager = null;
    }
    this.myForm.setValue( obj );

  }

	changeClients( emails ){
    let obj = this.myForm.value;
    obj.clients = emails;
    this.myForm.setValue( obj );
	}

	@Input()
	set event(event: any) {
    this.event_click = event || null;
  }

  @Input()
  set project( project: any ){
  	if( project ){
  		this.projectVal = project;

	  	let obj = this.myForm.value;
	    obj.title = project.title;

	    this.description = project.description;

	    project.manager.text = project.manager.email;
	    this.manager = project.manager;

	    this.image = new ImageModel(project.image, true);
	    if( project.clients ) this.clients = project.clients;
    	this.myForm.setValue(obj);
  	}
  }

	@Input() users: Array<any> = [];

	constructor(
		private _fb: FormBuilder,
		private userService: UserService,
		private projectService: ProjectService) {}


  ngOnInit(){
    this.myForm = new FormGroup({
      title: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
      manager: new FormControl( '' ),
      description: new FormControl('', [<any>Validators.maxLength(400)]),
      clients: new FormControl(''),
      status: new FormControl(''),
    });
  }
	public managerGet(value){
		console.log(value);
	}

	removeProject(){
		// remove project
		console.log("remove project:", this.projectVal );
	}

	archiveProject(){
		//this.projectService()
		console.log("archive project:", this.projectVal );
	}

	save( data, isValid: boolean) {

    this.submitted = true;
    if( isValid ) {

    	console.log( data );

    	if( this.imageKey ){
    		data.image = this.imageKey;

    		this.callback_upload = (err, data)=>{
    			console.log( err, data );
    		}

    		data.projectid = this.projectVal.id;
		    this.projectService.update( data ).subscribe((result) => {

			  });
		  } else {
		  	console.log("Картинка не выбрана!");
		  }
	  }
	}
}
