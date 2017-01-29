import { Injectable } from '@angular/core';
enum Menu {
  LanguageMenu, 
  BurgerMenu,
  UserMenu
}


@Injectable()
export class MenuCenter { 
	constructor(){}
	public currentWindow: any = null;
	public get MENU(): any { return Menu; }

	isOpenMenu( menu: number ){
    return this.currentWindow == menu;
  }

  openMenuOrClose( menu: number, action: boolean ){
    this.currentWindow = menu;
  }

  openMenu( menu: number ){
    if( this.currentWindow != menu ){
      this.currentWindow = menu;
    } 
  }

  closeMenu(){
    this.currentWindow = null; 
  }
}