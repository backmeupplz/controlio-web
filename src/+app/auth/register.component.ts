// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Component({
  selector: 'reg',
  template: `<signup></signup>`,
  providers: [UserService]
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(email: any, password: any) {
    this.userService.login(email, password).subscribe((result: any) => {
      if (result) {
        this.router.navigate(['']);
      }
    });
  }
}