import { Component, Input, ElementRef } from '@angular/core';
import { DropDownList } from './drop-down-list.component';

@Component({
	selector: "language-drop-down-list",
	template: require("./language.pug"),
  host: {
    '(document:click)': 'onClick($event)',
  },
})

export class LanguageDropDownList extends DropDownList {
	constructor( protected elementRef: ElementRef ){
		super( elementRef );
	}
}
