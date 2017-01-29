import { Component, Input } from '@angular/core';

@Component({
	selector: 'mh-button',
	template: require('./Button.pug')
})
export class ButtonComponent {
	@Input() title: string;
	@Input() mods: string;
	@Input('image-mods') imageMods: string;
	@Input('text-mods') textMods: string;
	constructor(){}
}
