import { Component, OnInit, ViewChild } from '@angular/core';
// import { UserService } from './users/user.service';
// import { MenuCenter } from '../DropDownList';
import { UserAuthModel } from '../../auth/models';
import { AuthService } from '../../auth/AuthServices';
import { BurgerDropDownList } from '../DropDownList';

@Component({
  styles: [`
  :host, .nav-block {
    height: 100%;
  }
  `],
  selector: 'top-nav',
  template: require('./TopNav.component.pug')
})
export class TopNavComponent implements OnInit {

  @ViewChild(BurgerDropDownList) burger: BurgerDropDownList;

  changeView( access: boolean ){
    this.burgerShow = this.isAccess;
  }

  private burgerShow: boolean = false;

  private isAccess: boolean = false;
  public event: any = null;
  private user: any = null;

  private pages: any[];
  private burger_list: any[];
  private addProject: any;
  private languageFullView: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserAuthModel
    // private menuCenter: MenuCenter
    ) {
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
    this.burger_list.push({
      title: "New Project",
      icon: "assets/add-circle-outline.svg",
      css: "add-projects col-md-6 col-sm-6",
      url: "project/add"
    });

    this.isAccess = this.authService.isLoggedIn();
    this.changeView( this.isAccess );

  }
  ngOnInit() {

    console.log("Message!")
    this.authService.loggedIn$.subscribe((value) => {

      console.log("authService top nav",value);

      this.isAccess = value;
      this.changeView( this.isAccess );
    });
  }
  openBurger(){
    this.burger.open();
  }
}
