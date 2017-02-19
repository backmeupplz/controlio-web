import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
	selector: "drop-down-list",
	template: "",
  host: {
    '(click)': 'onClick($event)',
  },
})

export class DropDownList {

  @Input() data: any = null;
  @Output() closedChange = new EventEmitter(true);

  private setOpen: boolean = false;
  protected _close: boolean = true;
  get close(){
    return this._close;
  }

  constructor(protected elementRef: ElementRef){}

  onChanges(newValue) {
    this.closedChange.emit(newValue);
  }

  open(){
    if(!this._close){
      this._close = true;
      this.setOpen = false;
    } else {
      this.setOpen = true;
      this._close = false;
    }
  }

  onClick(event) {
    if( event != null && !this.close && !this.setOpen ) this.handleClick(event);
    this.setOpen = false;
  }

  handleClick(event){
    if (!this.elementRef.nativeElement.contains(event.target)){
      this._close = true;
      this.setOpen = false;
      this.onChanges(true);
    }
  }
}
