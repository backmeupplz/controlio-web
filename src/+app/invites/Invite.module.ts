import { NgModule, ModuleWithProviders } from '@angular/core';
import { InitviteLinkBlockComponent } from './InviteLinkBlock';
import { InviteService } from './InviteServices';
import { AuthServiceModule } from '../auth';
import { CommonModule } from '@angular/common';
import { ProjectTemplateModule } from '../projects';

import { RouterModule, Routes } from '@angular/router';
import { BemModule } from 'angular-bem';
import { SvgModule } from '../Svg';
import { ImageModule } from '../Image';
import { MomentModule } from 'angular2-moment';
import { FormHelperModule } from '../FormHelper';

@NgModule({
      imports: [AuthServiceModule, CommonModule, ProjectTemplateModule, RouterModule, BemModule, SvgModule, ImageModule, MomentModule, FormHelperModule],
      exports: [ InitviteLinkBlockComponent ],
      declarations: [ InitviteLinkBlockComponent ]
})
export class InviteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InviteModule,
      providers: [InviteService]
    }
  }
}
