import { Component, Output, EventEmitter, ElementRef, Input } from '@angular/core';


@Component({
  selector: 'limit-input',
  template: `
		<label class="context" for="description">{{ label }} <span class="limit-str">{{ use }} / {{ limit }}</span></label>
		<textarea
		type="text"
		id="description"
		[(ngModel)]="inputValue"
		name="inputValue"
		(paste)="inputPaste($event)"
		(keydown)="inputChanged($event)"
		(blur)="inputBlurred($event)"
		ngDefaultControl row="3"></textarea>
  `,
})

export class LimitInput {
  componentName: "LimitInput";
  public inputValue: string = '';
  public limit: number = 210;
  public use: number = 0;

  @Input() label: string;
  @Output() inputChange = new EventEmitter();
  @Input()
  set value( str: string ){
    if( str ) this.onChange( str );
  }

  onChange( str: string ){
  	this.inputValue = str.slice( 0, this.limit );
    this.inputChange.emit( this.inputValue );
  	this.use = this.inputValue.length;
    this.adjustHeight( this.elementRef.nativeElement );
  }

  public adjustHeight(textarea){
    let childs = textarea.children;
    if( childs.description ){
      let clild = childs.description;
      let dif = clild.scrollHeight - clild.clientHeight;
      if (dif){
          if (isNaN(parseInt(clild.style.height))){
              clild.style.height = clild.scrollHeight + "px";
          }else{
              clild.style.height = parseInt(clild.style.height) + dif  + "px";
          }
      }
    }
  }
  constructor(private elementRef: ElementRef) { }
  inputChanged(event) {
    let key = event.keyCode;
    if( key != 8 ){
    	this.onChange( this.inputValue );
    } else {
    	this.use = this.inputValue.length;
    }
  }

  inputBlurred(event) {
  	this.onChange( this.inputValue );
  }

  inputPaste(event) {
  	this.onChange( this.inputValue );
  }
}
