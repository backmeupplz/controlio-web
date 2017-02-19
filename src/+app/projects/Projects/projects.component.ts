import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectListElem } from '../projects/project_list_elem.component.js';
import { ProjectService } from '../projects/project.service';


@Component({
  styles: [`
    .project-list {
      padding-bottom: 90px;
    }
  `],
  selector: 'projects',
  template: require("./template.pug")
})

export class Projects {
  componentName: "Projects";
  private projects: Array<any> = [];
  private loading: boolean = false;
  private title: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ){
    this.title = "You don't have projects yet, create your first one!";
  }

  onSearch(value: any){
    console.log(value);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {

      this.loading = true;
      this.projectService.getProjects( 0, 10 ).subscribe( res => {
        this.loading = false;
        this.projects = res;
        console.log(res);
      });
    });
  }
}
