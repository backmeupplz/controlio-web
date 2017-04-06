import { Component, Input } from '@angular/core';

@Component({
	selector: 'bts-icon',
	template: '<span class="{{ _font }} {{ _font + sep + _icon }} {{ _styles }}" aria-hidden="true"></span>'
})
export class IconComponent {
	componentName: "IconComponent";
	private _styles: string = '';
	@Input() 
	set styles(styles: string){
		this._styles = styles;
	}

	private _icon: string;
	@Input() 
	set icon(icon: string){
		this._icon = icon;
	}
	
	private sep: string = '-';
	private _font: string = 'glyphicon';
	@Input()
	set font( font: string ){
		this._font = font;
		this.sep = '';
	}
}