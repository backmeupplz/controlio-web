import 'rxjs/add/operator/pairwise';
import { Component, ViewChild, ContentChild } from '@angular/core';
import { MenuBlock } from './nav/top_block.component.js';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './users/user.service';
import { UserDropDownList } from './nav/user-drop-down-list.component';
import { MenuCenter } from './nav/menu-center';

@Component({
  selector: 'app',
  template: require("../template/elements/app.pug")
})
export class AppComponent {
  private MODALS: any ;

  private burgerShow: boolean = false;

  private isAccess: boolean = false;
  public event: any = null;
  private user: any = null;

  private pages: any[];
  private burger_list: any[];
  private addProject: any;
  private languageFullView: boolean;

  changeView( access: boolean ){
    this.burgerShow = this.isAccess;
   }

  setReadyClass(){

    let arr = document.querySelector('body').className.split(' ');
    let result = arr.reduce((prev, next)=>{
      return (next == 'loading-view') ? prev : prev + next
    }, "");

    document.querySelector('body').className = result + " ready-view";
  }

  ngAfterViewInit() {
    this.setReadyClass();
  }


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private menuCenter: MenuCenter
  ){

    this.languageFullView = true;

    this.addProject = {
      title: "New Project",
      icon: "assets/add-circle-outline.svg",
      css: "add-projects col-md-6 col-sm-6 hidden-xs hidden-sm",
      url: "project/add"
    };

    let data = [
      { title: "Projects", url: "/projects" },
      { title: "Plans", url: "/plans"  },
      { title: "Support", url: "support" }
    ];

    this.pages = [
      { title: "Projects", url: "/projects" },
      { title: "Plans", url: "/plans"  },
      { title: "Support", url: "support" }
    ];

    this.burger_list = data;
    this.burger_list.push(this.addProject);


    let self = this;
    this.isAccess = this.userService.isLoggedIn();

    this.userService.loggedIn$.subscribe((value) => {
      self.isAccess = value;
      self.changeView( self.isAccess );
      self.user = self.userService.getAuthUser();
    });

    this.user = this.userService.getAuthUser();
    this.changeView( this.userService.isLoggedIn() );

  }
}
