import { Component, Input } from '@angular/core';
import { UserModel } from '../../users';
import { AbstractImageModel } from '../../Image';

@Component({
  selector: 'project-list-elem',
  styles: [`
  .subtitle-notset {
    opacity: .5;
  }

  :host >>> cn-img {
    position: relative;
    overflow: hidden;
  }

  .bottom-block {
    align-content: space-between;
    display: flex;
    flex-direction: column;
  }

  .bottom-block .author {
    position: absolute;
    bottom: 0;
  }

  `],
  template: require("./project_list_elem.pug")
})

export class ProjectListElem {
  @Input() title: string  = "New Project";
  @Input() description: string = "Awesome Project!";
  @Input() subtitle: string = "Default";
  @Input() imageKey: string;
  @Input() image: AbstractImageModel;
  @Input() capImage: string = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiPjxnPjwvZz48cGF0aCBkPSJNMzE2LjA1OCAxNDUuNjg1bC0wLjQyLTIuNTA5Yy0zLjYzNS0zMC4yNTktMjkuMzM3LTUzLjA2NC01OS42NTgtNTMuMDY0LTI5LjkwMSAwLTU1LjI4NiAyMi4yMzEtNTkuNDc0IDUxLjg4Ni0wLjA1MSAwLjM3OS0wLjEyMyAzLjI5OC0wLjE2NCAzLjcwN2wxOC43OC0wLjI1NmMyLjU0LTIwLjc0NiAyMC4xMDEtMzYuNDEzIDQwLjg1Ny0zNi40MTMgMjAuNzc3IDAgMzguMzU5IDE1LjY1NyA0MC44OTkgMzYuNDEzbDE5LjE4IDAuMjM2eiIgZmlsbD0iIzAwMDAwMCIgLz48cGF0aCBkPSJNMzk1LjA3OSAxNjMuMjQ2aC0yNzguMTU5Yy0yMi4xMjkgMC00MC41MyAxNS4yNDgtNDUuNzIxIDM1Ljc0OGgzNjkuNTkyYy01LjE3MS0yMC40OS0yMy41OTMtMzUuNzQ4LTQ1LjcxMi0zNS43NDh6IiBmaWxsPSIjMDAwMDAwIiAvPjxwYXRoIGQ9Ik02OS42MDIgMjIwLjAzN3YxNTQuNTUzYzAgMjYuMTQyIDIxLjE3NyA0Ny4yOTggNDcuMzE5IDQ3LjI5OGgyNzguMTU5YzI2LjE0MiAwIDQ3LjMxOS0yMS4xNTYgNDcuMzE5LTQ3LjI5OHYtMTU0LjU1M2MwLTAuNzQ4LTAuMjA1LTEuNDU0LTAuMjE1LTIuMjIyaC0zNzIuMzU3Yy0wLjA0MSAwLjc3OC0wLjIyNSAxLjQ3NS0wLjIyNSAyLjIyMnoiIGZpbGw9IiMwMDAwMDAiIC8+PC9zdmc+'
  @Input() id: any;
  private _post: any;
  @Input()
  set post(post: any){
    if(post) this._post = post;
  }
  @Input() owner: UserModel;
  @Input() date: any;
  @Input() manager: any = null;
  @Input() isOpenSettings: boolean = false;
  constructor() {}
}
