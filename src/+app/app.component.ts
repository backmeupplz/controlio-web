import { Component } from '@angular/core';
import { AuthService } from './auth';

@Component({
  selector: 'app',
  template: require("./app.pug")
})
export class AppComponent {
  private isAccess: boolean = false;
  constructor(private authService: AuthService){
    this.isAccess = this.authService.isLoggedIn();
    this.authService.loggedIn$.subscribe((value) => {
      this.isAccess = value;
    });
  }
}
