import { Component, ViewChild } from "@angular/core";
import { Modal } from "ng2-modal";
import { UserService } from '../users/user.service';

@Component({
    selector: "signup-modal",
    template: `
    <modal #SignUp modalClass="modal-view"  [closeOnOutsideClick]="true">
        <modal-content>
            <signup></signup>
        </modal-content>
    </modal>
`
})
export class SignUpModal { 
  componentName: "SignUpModal";
  @ViewChild('SignUp')  Modal: Modal;
  constructor(private userService: UserService){

    this.userService.loggedIn$.subscribe(
    value => {
      if(value) this.close();
    });
  }
  open() {
    this.Modal.open();
  }

  close() {
    this.Modal.close();
  }
}