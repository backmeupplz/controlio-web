import { Injectable } from '@angular/core';
@Injectable()
export class FormMessageService {

	private strings = {
		email: {
			required: "Please type email",
			incorrectMailFormat: "Please include a valid email address"
		},
		password: {
			required: "Please type your password",
      minlength: (data)=>{
        let count = (data) ? data.requiredLength : NaN;
        return `Length password should be < ${count}`;
      }
		},
		confirm: {
			required: "Please confirm your password",
			noConfirm: "No confirm"
		},
    message: {
      required: "Please type message",
      maxlength: (data)=>{
        let count = (data) ? data.requiredLength : NaN;
        return `Length password should be < ${count}`;
      }
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

	createList( components: any[] ){
		let obj = {};
		for( let item of components ){
			obj[ item ] = this.getMessages(item);
		}
		return obj;
	}
}
