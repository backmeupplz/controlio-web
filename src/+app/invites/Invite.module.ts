import { NgModule } from '@angular/core';
import { InitviteLinkBlockComponent } from './InviteLinkBlock';
import { InviteService } from './InviteServices';
import { AuthServiceModule } from '../auth';
import { CommonModule } from '@angular/common';

@NgModule({
      imports: [AuthServiceModule, CommonModule],
      exports: [ InitviteLinkBlockComponent ],
      declarations: [ InitviteLinkBlockComponent ],
      providers: [InviteService],
})
export class InviteModule {}
