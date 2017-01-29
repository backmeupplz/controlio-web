// logged-in.guard.ts
import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../users/user.service';
import { Location } from '@angular/common'

@Injectable()
export class LoggedInGuard implements CanActivate {  

  constructor(private user: UserService, private router:Router, private location: Location) {}

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

    if (!this.user.isLoggedIn()) {
    	//this.location.go('/login');
    	//console.log("login");
      this.router.navigate(['/login']);
      console.log("route", this.router.url);
      return false;
    }

    return true;
  }

}