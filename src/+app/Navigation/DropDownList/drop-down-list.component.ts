import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
	selector: "drop-down-list",
	template: "",
  host: {
    '(click)': 'onClick($event)',
  },
})

export class DropDownList {

  private  _data: any = null;
  @Input('data')
  set data(data: any){

    this._data = data;
  }
  get data(){
    return this._data;
  }

  @Output() closedChange = new EventEmitter(true);

  protected setOpen: boolean = false;
  protected _close: boolean = true;
  get close(){
    return this._close;
  }

  constructor(protected elementRef: ElementRef){}

  onChanges(newValue) {
    this.closedChange.emit(newValue);
  }

  open(){
    console.log("open", this._close, this.setOpen)
    if(!this._close){
      this._close = true;
      this.setOpen = false;
    } else {
      this.setOpen = true;
      this._close = false;
    }
  }
  setClose(){
    this.setOpen = false;
    this._close = true;
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
    } else {
      this._close = true;
      this.setOpen = false;
      this.onChanges(true);
    }
  }
}
