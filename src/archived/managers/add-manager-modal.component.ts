import { Component, ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import { ModalWindow } from "../helpers/modal-window.component";

@Component({
    selector: "add-manager-modal",
    template: `
    <modal #AddManager modalClass="modal-view middle-modal" [closeOnOutsideClick]="true">
        <modal-content>
            <add-manager #EventsElem [event]="event" (click)="sendEvent($event)"></add-manager>
        </modal-content>
    </modal>`
})

export class AddManagerModal extends ModalWindow { 
  componentName: "AddManagerModal";
  private event: any;
  @ViewChild('EventsElem') EventsElem: ElementRef;
  @ViewChild('AddManager')  ModalWindow: ModalWindow;
  constructor(private router: Router){
    super();
  }

  sendEvent(e){
    this.event = e;
  }

  ngAfterViewInit(){
    this.Modal = this.ModalWindow;
    let event = new MouseEvent('click', {bubbles: true});
  }
}