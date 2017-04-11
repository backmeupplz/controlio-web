import { Component, Input, ViewChild } from '@angular/core';
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

  @Input()
  set userValue( user: any ){
    this.user = user;
  }

  constructor() {}

  openDropDownList(){
    this.list.open();
  }
}
