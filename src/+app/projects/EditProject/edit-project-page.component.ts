import { Component } from '@angular/core';
import { UserService } from '../../users';

import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { ProjectService } from '../ProjectServices';
import { ProjectModel } from '../models';

@Component({
  styles: [`
    .white-page {
      background: #fff;
      width: 100%;
    }

    .form-page {
      margin-left: 0;
    }

    .white-page /deep/ .form-modal {
      padding: 0;
    }
  `],
  selector: 'edit-project-page',
  template: `
  <div class="center-block you-dont-have-project" *ngIf="project == null">
    <h1 class="text">{{ title }}</h1>
  </div>
  <div class="white-page">
    <div class="container">
      <div class="row">
        <div class="col-xs-8 form-page">
          <edit-project [project]="project" [users]="users"></edit-project>
        </div>
      </div>
    </div>
  </div>`
})
export class EditProjectPage {
  private users: any = [];
  private project: ProjectModel;
  private isLoading: boolean = false;
  private title: string = "Loading ...";

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService ){}


  public ngOnInit() {

    this.route.params.forEach((params: Params) => {
      this.isLoading = true;
      this.projectService.get( params['id'] ).subscribe( res => {
        this.project = res;
        ;
        if(!this.project == null ){
          this.isLoading = false;
          this.title = `This is project deleted or not exist`;
        } else {
          //if( this.project.clients ) this.clients = this.project.clients;
          this.isLoading = false;
        }
      });
    });

    // if( this.userService.isLoggedIn() ){
    //   // this.userService.getAuthUsers().subscribe((result) => {

    //   //     let index = 0;
    //   //     let users = result.map(elem=>{
    //   //       index++;
    //   //       ;
    //   //       return { userId: elem._id, name: ( elem.name || elem.email ), id: index };
    //   //     });

    //   //     this.users = users;
    //   //   });

    // }
  }
}
