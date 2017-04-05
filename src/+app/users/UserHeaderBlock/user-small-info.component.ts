import { Component, Input, ViewChild } from '@angular/core';
import { AppConfig } from '../../app.config';
import { UserDropDownList } from '../../Navigation/DropDownList/user-drop-down-list.component';
@Component({
  styles: [`:host { cursor: pointer; }`],
  selector: 'user-small-info',
  template: require("./user_block.pug")
})


export class UserSmallInfoComponent {

  @ViewChild(UserDropDownList) list: UserDropDownList;

  private user: any;
  private photo: string;
  public defaultImage: string = AppConfig.DEFAUL_IMG;
  constructor() {}

  @Input()
  set userValue( user: any ){
    this.user = user;
  }

  openDropDownList(){
    console.log("openDropDownList")
    this.list.open();
  }
}
