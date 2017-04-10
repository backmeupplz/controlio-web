import { Component, OnInit } from '@angular/core';
import { InviteService } from '../InviteServices';
import { UserAuthModel } from '../../auth';
import { InviteModel } from '../models';

@Component({
  selector: 'link-invite-block',
  template: require('./link-block.component.pug')
})
export class InitviteLinkBlockComponent implements OnInit {
  private invites: InviteModel[];
  constructor(private inviteService: InviteService, private userAuthModel: UserAuthModel) { }
  ngOnInit() {
    this.inviteService.getInvites(this.userAuthModel.id).subscribe((res)=>{
      console.log(res);
      this.invites = res;
    })
  }
}
