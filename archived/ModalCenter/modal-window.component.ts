import { Component, ViewChild } from '@angular/core';
import { Modal } from "ng2-modal";

@Component({
  host: {
    '(document:click)': 'handleClick($event)',
  },
  selector: 'modal-window',
  template: "",
})

export class ModalWindow {
  componentName: string = "ModalWindow";
  public Modal = null;
  protected isOpen: boolean = false;

  handleClick(e){
    console.log("e", e );
  }

  public open() {
    if( this.Modal.open != undefined ) {
      this.isOpen = true;
      this.Modal.open();
    }
  }
  close(){
    if( this.Modal.close != undefined ) {
      this.isOpen = false;
      this.Modal.close();
    }
  }
}

