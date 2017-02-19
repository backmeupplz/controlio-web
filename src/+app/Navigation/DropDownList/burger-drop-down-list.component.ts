import { Component, Input, ElementRef } from '@angular/core';
import { DropDownList } from './drop-down-list.component';

@Component({
	selector: "burger-drop-down-list",
	template: require("./burger.pug"),
  host: {
    '(document:click)': 'onClick($event)',
  },
})

export class BurgerDropDownList extends DropDownList {
	constructor( protected elementRef: ElementRef ){
		super( elementRef );
		this.data = [];
	}
}

