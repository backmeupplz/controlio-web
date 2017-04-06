import { Component, ViewChild, ElementRef, Renderer } from "@angular/core";
import { Modal } from "ng2-modal";
import { ModalWindow } from "../helpers/modal-window.component";
import { UserService } from '../users/user.service';

import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { ProjectService } from '../projects/project.service';

@Component({
    selector: "edit-project-modal",
    template: `
    <modal #EditProject modalClass="modal-view big-modal" id="some" >
        <modal-content>
            <edit-project #EventsElem (click)="sendEvent($event)" [event]="event" [users]="users" [project]="project"></edit-project>
        </modal-content>
    </modal>`
})

export class EditProjectModal extends ModalWindow {
  componentName: "EditProjectModal";
  public isNeedAccess: boolean = true;
  @ViewChild('EditProject') ModalWindow: ModalWindow;
  @ViewChild('EventsElem') EventsElem:ElementRef;
  private users: any = [];
  private project: any;
  private event: any;
  sendEvent(e){
    this.event = e;
  }

  private getAuthUsers(){
      this.userService.getAuthUsers().subscribe((result) => {

        let index = 0;
        let users = result.map(elem=>{
          index++;
          return { userId: elem._id, name: ( elem.name || elem.email ), id: index };
        });

        this.users = users;
      });
  }

  public open() {
    if( this.Modal.open != undefined &&  this.userService.isLoggedIn() ) {
      this.Modal.open();
      this.isOpen = true;
    }
  }


  constructor(private userService: UserService,
      private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
    ){
    super();
    // this.router.events
    //   .map(_ => this.router.routerState.root)
    //   .map(route => {
    //     while (route.firstChild) route = route.firstChild;
    //     if( this.isOpen ){
    //       // if( !route.params.value.id ){
    //       //   this.close();
    //       // } else {
    //       //   this.getAuthUsers();
    //       //   const self = this;
    //       //   this.projectService.get( route.params.value.id ).subscribe( res => {
    //       //     self.project = res;
    //       //     
    //       //   });
    //       // }
    //     }
    //     return route;
    //   })
    //   .flatMap(route => route.data )
    //   .subscribe(data => {});
  }

  ngAfterViewInit(){
    this.Modal = this.ModalWindow;
    let event = new MouseEvent('click', {bubbles: true});
  }
}
