import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-block',
  template: require("./menu_block.pug")
})

export class MenuBlockComponent {
  @Input() title: string;
  @Input() ischecked = false;
  @Input() url: string;
  @Input() icon: string;
  @Input() action: any;
  onClick(){
    if(this.action) return this.action();
    else return null;
  }
  constructor() {}
}
