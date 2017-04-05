import { Component } from '@angular/core';
import { UserService } from '../../users/UserServices/user.service';

@Component({
  styles: [`
    .white-page {
      background: #fff;
      width: 100%;
    }

    .form-page {
      margin-left: 0;
    }

    .white-page /deep/ .form-modal {
      padding: 0;
    }
  `],
  selector: 'add-project-page',
  template: `
  <div class="white-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-xs-12 form-page">
          <add-project  [users]="users"></add-project>
        </div>
      </div>
    </div>
  </div>`
})
export class AddProjectPage {
  private users: any = [];
  constructor(private userService: UserService ){}
  public ngOnInit() {
  //   this.userService.getUsers().subscribe((result) => {

  //       let index = 0;
  //       let users = result.map(elem=>{
  //         index++;
  //         ;
  //         return { userId: elem._id, name: ( elem.name || elem.email ), id: index };
  //       });

  //       this.users = users;
  //     });

  }
}
