import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../AuthServices';
import { Location } from '@angular/common'

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private auth: AuthService, private router:Router, private location: Location) {}

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
