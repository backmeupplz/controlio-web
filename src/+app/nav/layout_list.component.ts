import { Router } from '@angular/router';

export class AppComponent { 
  public openMenu: boolean = false;
  constructor(private router: Router){ 

    this.router.events.pairwise().subscribe((e) => {
      this.openMenu = false;
    }
  }

  ngOnInit() {
    this.openOrCloseBurgerMenu = function( close: boolean ){
      this.openBurgerMenu = (close) ? close: (this.openBurgerMenu) ? false: true;
    }
  }
}