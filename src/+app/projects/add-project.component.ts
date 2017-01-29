import { Component, OnInit,  Output, Input, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../validation/global-validator';

import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { Email } from '../helpers/form-elements/email.component';
import { LimitInput } from '../helpers/form-elements/limit.component';
import { ProjectService } from '../projects/project.service';
import { ImportFileElement } from '../helpers/form-elements/file-upload.component';

@Component({
  selector: 'add-project',
  template: require("./add_form.pug")
})


@Injectable()
export class AddProject implements OnInit {
  componentName: "AddProject";
	public myForm: FormGroup; // our model driven form
	public submitted: boolean; // keep track on whether form is submitted
	public events: any[] = []; // use later to display form changes
	public manager: any = null;
	private event_click: any;
	public typeWindow: string = "Add Project";
	private imageKey: string;
	private callback_upload: any = null;
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

	changeClients( emails ){
    let obj = this.myForm.value;
    obj.clients = emails;
    this.myForm.setValue( obj );
	}

	@Input()
	set event(event: any) {
    this.event_click = event || null;
  }

	@Input() users: Array<any> = [];

	constructor(
		private _fb: FormBuilder,
		private userService: UserService,
		private router: Router,
		private projectService: ProjectService) {

	}

	ngOnInit() {

		if( this.userService.isLoggedIn() ){
			// this.userService.getAuthUsers().subscribe((result) => {

			// 		let index = 0;
			// 		let users = result.map(elem=>{
			// 			index++;
			// 			console.log(elem);
			// 			return { userId: elem._id, name: ( elem.name || elem.email ), id: index };
			// 		});

			// 		console.log( users );
			// 		this.users = users;
			//   });

		}

		    this.myForm = new FormGroup({
		        title: new FormControl('', [<any>Validators.required, <any>Validators.minLength(6)]),
		        manager: new FormControl( '' ),
		        description: new FormControl(''),
		        clients: new FormControl(''),
		        status: new FormControl(''),
		    });

	}

	public managerGet(value){
		console.log(value);
	}


	save( data, isValid: boolean) {


		console.log( data, isValid );
    this.submitted = true;
    if( isValid ) {

    	console.log( data );

    	if( this.imageKey ){
    		data.image = this.imageKey;

    		this.callback_upload = (err, data)=>{
    			console.log( err, data );
    		}
		    this.projectService.create( data ).subscribe((result) => {

			  });
		  } else {
		  	console.log("Картинка не выбрана!");
		  }
	  }
	}
}
