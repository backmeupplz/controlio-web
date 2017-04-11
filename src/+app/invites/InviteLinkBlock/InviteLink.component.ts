import { Component, Input } from '@angular/core';
import { InviteService } from '../InviteServices';
import { UserAuthModel } from '../../auth';
import { InviteModel } from '../models';

@Component({
  styles: [`
  .subtitle-notset {
    opacity: .5;
  }

  :host >>> cn-img {
    position: relative;
    overflow: hidden;
  }

  .bottom-block {
    align-content: space-between;
    display: flex;
    flex-direction: column;
  }

  .bottom-block .author {
    bottom: 0;
  }

  .buttons {
    right: 0;
    bottom: 0;
    margin: 20px 0;
    padding-left: 0;
  }

  .buttons .accept-button {
    margin-left: 15px;
  }

  `],
  selector: 'link-invite-block',
  template: require('./link-block.component.pug')
})
export class InitviteLinkBlockComponent {
  @Input() invites: InviteModel[];
  constructor(private inviteService: InviteService, private userAuthModel: UserAuthModel) {}
  acceptInvite(invite: InviteModel, accept: boolean){
    this.inviteService.accept(this.userAuthModel.id, invite.id, accept).subscribe((res)=>{
      invite.accept = accept;
    })
  }
}
