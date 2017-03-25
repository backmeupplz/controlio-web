import { Component, Input } from '@angular/core';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'project-list-elem',
  styles: [`
  .content > .bottom-block {
    padding-bottom: 20px;
  }

  .content > .bottom-block .author {
    margin-top: 15px;
  }
  `],
  template: require("./project_list_elem.pug")
})

export class ProjectListElem {
  @Input() title: string  = "New Project";
  @Input() description: string = "Awesome Project!";
  @Input() subtitle: string = "Default";
  @Input() image: string;
  @Input() id: any;
  private _post: any;
  @Input()
  set post(post: any){
    console.log(post);
    if(post) this._post = post;
  }
  @Input() date: any;
  @Input() manager: any = null;
  @Input() isOpenSettings: boolean = false;
  componentName: "ProjectListElem";
  private defaultImage: string = AppConfig.DEFAUL_IMG;
  constructor() {

  }
}
