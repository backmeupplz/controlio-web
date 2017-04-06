import { Component, ViewChild, Injectable } from '@angular/core';
import {  Router, NavigationEnd, PRIMARY_OUTLET  } from '@angular/router';

/**
* Import modals
*/
import { SignInModal } from "../auth/signin-modal";
import { SignUpModal } from "../auth/signup-modal";
import { AddProjectModal } from '../projects/add-project-modal';
import { AddManagerModal } from '../managers/add-manager-modal.component';
import { EditProjectModal } from '../projects/edit-project-modal';
import { UserProfileModal }  from '../users/user-profile.modal';

/**
* Use enum for link
*/
enum Modals {
	SignInModal,
	SignUpModal,
	AddProjectModal,
	AddManagerModal,
  EditProjectModal,
  UserProfileModal
}

@Component({
  selector: 'app-modal-center',
  template: require("../template/elements/modals_connect.pug"),
})

export class AppModalCenter  {
  componentName: "AppModalCenter";

  /**
  * Add modals in class
  */
  @ViewChild(AddProjectModal) AddProjectModal: AddProjectModal;
  @ViewChild(SignInModal) SignInModal: SignInModal;
  @ViewChild(SignUpModal) SignUpModal: SignUpModal;
  @ViewChild(AddManagerModal) AddManagerModal: AddManagerModal;
  @ViewChild(EditProjectModal) EditProjectModal: EditProjectModal;
  @ViewChild(UserProfileModal) UserProfileModal: UserProfileModal;

  public static get MODAL(): any { return Modals; }
  public currentOpenModals = null;

  public findModal( modalId: number ) {
		if( this[ Modals[ modalId ] ] != undefined ) return this[ Modals[ modalId ] ];
		return null;
	}

	public openModal( modalnum: number ){

		let modal = this.findModal( modalnum );
		if( modal ){
			this.closeModal();
			this.currentOpenModals = modal;
			modal.open();
		}
	}

	public closeModal(){
		if( this.currentOpenModals != null ) this.currentOpenModals.close();
		this.currentOpenModals = null;
	}

	constructor(private router: Router ){

		// this.router.events
  //     .filter(event => event instanceof NavigationEnd)
  //     .map(_ => this.router.routerState.root)
  //     .map(route => {
  //       while (route.firstChild) route = route.firstChild;
  //       // if( route.params.value.modalOpen ){
  //       // 	this.openModal( route.params.value.modalOpen )
  //       // } else {
  //       // 	this.closeModal()
  //       // }
  //       return route;
  //     })
  //     .flatMap(route => route.data )
  //     .subscribe(data => {});

  };


}
