import { Component, OnInit } from '@angular/core';
import { UserService } from '../UserServices';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'profile-user',
  template:
  `
    <div class="container" *ngIf="user">
      <div class="row">
        <div class="profile  col-md-8 col-sm-12 col-xs-12">
          <div class="content">
            <div class="top-block">
              <span class="author no-padding-bottom">
                <!-- imgb class="photo-mini" [key]="user.photo"></imgb -->
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
      </div>
    </div>
   `
})

export class ProfileComponent {
  private user: UserModel;
  constructor(
    private userService: UserService
    ) { }
  ngOnInit(){
    this.userService.getProfile().subscribe((result) => {
     
      this.user = result;
    })
  }
}
