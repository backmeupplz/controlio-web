import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AppSettings } from '../app-settings';
import { User } from './user.model';

@Component({
  selector: 'profile-user',
  template:
  `
    <div class="container">
      <div class="row">
        <div class="profile  col-md-8">
          <div class="content">
            <div class="top-block">
              <span class="author no-padding-bottom">
                <imgb class="photo-mini" [key]="user.photo"></imgb>
                <div class="text-block">
                  <p class="context">Username</p>
                  <p class="info">{{ user.name || '-' }}</p>
                  <p class="context">Email</p>
                  <p class="info">{{ user.email }}</p>
                  <div *ngIf="user.phone">
                    <p class="context">Phone</p>
                    <p class="info">{{ user.phone }}</p>
                  </div>
                </div>
              </span>
              <a [routerLink]="['edit']" class="icon-p">
                  <img src="assets/edit.svg">
                  <p class="info">Edit</p>
              </a>
            </div>
          </div>
        </div>
        <div class="upgrade-block col-md-4">
          <div class="content">
            <div class="top-block">
              <p class="info">Upgrade your account to get access to other incredible features of our service</p>
              <button  class="cbutton" (click)="convertToBusiness()">Upgrade accout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
   `
})

export class ProfileComponent {
  componentName: "ProfileComponent";

  private user: User = new User({ _id: "", email: "" });
  private defaultImage: string = AppSettings.DEFAUL_IMG;
  constructor(private userService: UserService, private router: Router ) { }
  ngOnInit(){
    this.userService.getProfile().subscribe((result) => {
      this.user = result;
      console.log(result);
    })
    //this.userService.getUser( id ).subscribe((result) => {})

  }

  convertToBusiness(){
    this.userService.convertToBusiness().subscribe((result) => {
      console.log(result);
    })
  }
}
