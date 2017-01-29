import { Component } from '@angular/core';
import { UserService } from '../users/user.service';

@Component({
  selector: 'add-project-page',
  template: `<div class="container">
    <div class="row">
      <div class="col-xs-12 form-page">
        <add-project  [users]="users"></add-project>
      </div>
    </div>
  </div>`
})
export class AddProjectPage {
  private users: any = [];
  constructor(private userService: UserService ){}
  public ngOnInit() {
    if( this.userService.isLoggedIn() ){
      this.userService.getAuthUsers().subscribe((result) => {

          let index = 0;
          let users = result.map(elem=>{
            index++;
            console.log(elem);
            return { userId: elem._id, name: ( elem.name || elem.email ), id: index };
          });

          this.users = users;
        });

    }
  }
}
