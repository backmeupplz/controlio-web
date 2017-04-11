import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../ProjectServices/project.service';
import { ErrorCommon } from '../../ErrorHandler';
import { InviteModel, InviteService } from '../../invites';
import { UserAuthModel } from '../../auth';

@Component({
  styles: [`
    .project-list {
      padding-bottom: 90px;
    }

    .container {
      z-index: 4;
      position: relative;
    }
  `],
  selector: 'projects',
  template: require("./template.pug")
})

export class Projects {
  private projects: Array<any> = [];
  private loading: boolean = false;
  private title: string = "";
  private error: ErrorCommon;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private inviteService: InviteService,
    private userAuthModel: UserAuthModel
  ){
    this.title = "You don't have projects yet, create your first one!";
  }

  private invites: InviteModel[];

  private limitProjetLoad = 10;
  private skipProjet = 0;

  onScroll(){
    this.loadProjects()
  }
  onSearch(value: any){}
  ngOnInit(){
    this.loadProjects()
    this.inviteService.getInvites(this.userAuthModel.id).subscribe((res)=>{
      console.log(res);
      this.invites = res;
    })
  }
  loadProjects(){
    this.loading = true;
    this.projectService.getProjects( this.skipProjet, this.limitProjetLoad ).subscribe( res => {
      this.loading = false;
      this.skipProjet += this.limitProjetLoad;
      this.projects = this.projects.concat(res);
    }, (err: ErrorCommon)=>{
      this.loading = false;
      this.error = err;
    })
  }
}
