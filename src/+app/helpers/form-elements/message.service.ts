import { Injectable } from '@angular/core';
@Injectable()
export class FormMessageService {

	private strings = {
		email: {
			required: "Please type email",
			incorrectMailFormat: " Please include a valid email address"
		},
		password: {
			required: "Please type your password",
			minlength: "Length password should be > 6"
		},
		confirm: {
			required: "Please confirm your password",
			noConfirm: "No confirm"
		}
	};

	getMessages( component: string ){
		let arr: any = [];
		let scomponent = this.strings[component];
		for(let item in scomponent){
			arr.push({ name: item, message: scomponent[item] });
		}
		return arr;
	}

	createList( components: string[] ){
		let obj = {};
		for( let item of components ){
			obj[ item ] = this.getMessages(item);
		}
		return obj;
	}
}