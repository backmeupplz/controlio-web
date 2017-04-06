import { Component, ViewChild, ElementRef, Renderer } from "@angular/core";
import { Modal } from "ng2-modal";
import { ModalWindow } from "../helpers/modal-window.component";
import { UserService } from '../users/user.service';

@Component({
    selector: "add-project-modal",
    template: `
    <modal #AddProject modalClass="modal-view big-modal" id="some" >
        <modal-content>
            <add-project #EventsElem (click)="sendEvent($event)" [event]="event" [users]="users"></add-project>
        </modal-content>
    </modal>`
})

export class AddProjectModal extends ModalWindow { 
  componentName: "AddProjectModal";
  public isNeedAccess: boolean = true;
  @ViewChild('AddProject') ModalWindow: ModalWindow;
  @ViewChild('EventsElem') EventsElem:ElementRef;
  private users: any = [];
  private event: any;
  sendEvent(e){
    this.event = e;
  }
  public open() {
    if( this.Modal.open != undefined ) {
      this.Modal.open();
    }

    if( this.userService.isLoggedIn() ){
      this.userService.getAuthUsers().subscribe((result) => {

          let index = 0;
          let users = result.map(elem=>{
            index++;
            ;
            return { userId: elem._id, name: ( elem.name || elem.email ), id: index };
          });

          this.users = users;
        });

    }
  }
  constructor(private userService: UserService ){
    super();
  }

  ngAfterViewInit(){
    this.Modal = this.ModalWindow;
    let event = new MouseEvent('click', {bubbles: true});
  }
}