import { Component, ViewChild, ElementRef, Renderer } from "@angular/core";
import { Modal } from "ng2-modal";
import { ModalWindow } from "../helpers/modal-window.component";
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    selector: "user-profile-modal",
    template: `
    <modal #UserProfile modalClass="modal-view big-modal" id="some" >
        <modal-content>
            <edit-user [setUser]="user"></edit-user>
        </modal-content>
    </modal>`
})

export class UserProfileModal extends ModalWindow { 
  componentName: string = "UserProfileModal";
  public isNeedAccess: boolean = true;
  private user: User = new User({ _id: "", email: "" });
  @ViewChild('UserProfile') ModalWindow: ModalWindow;

  public open() {
    if( this.Modal.open != undefined ) {
      this.Modal.open();
    }

    if( this.userService.isLoggedIn() ){
      this.userService.getProfile().subscribe((result) => {
        this.user = result;
      });

    }
  }
  constructor(private userService: UserService ){
    super();
  }

  ngAfterViewInit(){
    this.Modal = this.ModalWindow;
  }
  
}