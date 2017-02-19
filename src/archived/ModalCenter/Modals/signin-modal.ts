import { Component, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { Modal } from "ng2-modal";
import { UserService } from "../users/user.service";
@Component({
    selector: "signin-modal",
    template: `
    <modal #SignIn modalClass="modal-view"  [closeOnOutsideClick]="true">
        <modal-content>
            <signin (logined)="handleLogin($event)"></signin>
        </modal-content>
    </modal>`
})

export class SignInModal { 
  componentName: "SignInModal";
  @ViewChild('SignIn')  Modal: Modal;
  constructor(private router: Router, private userService: UserService){
    this.router.events.pairwise().subscribe((e) => {
      this.Modal.close();
    });

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