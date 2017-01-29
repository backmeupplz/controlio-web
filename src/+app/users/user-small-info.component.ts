import { Component, Input } from '@angular/core';
import { UserService } from '../users/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuCenter } from '../nav/menu-center';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'user-small-info',
  template: require("./user_block.pug")
})

export class UserSmallInfoComponent {
  private user: any;
  private photo: string;
  public defaultImage: string = AppSettings.DEFAUL_IMG;
  constructor(
    private userService: UserService, private router: Router, private menuCenter: MenuCenter
    ) {
    this.photo = "assets/EF23F3CC-80AC-4C50-9CF7-23E6934C4A0B.png";
  }

  @Input() event: any;
  @Input()
  set userValue( user: any ){
    this.user = user;
  }
}
