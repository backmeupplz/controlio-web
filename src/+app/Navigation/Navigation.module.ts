import { NgModule } from '@angular/core';
import { MenuBlockModule } from './MenuBlock';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, UserAuthModel } from '../auth';
import { TopNavComponent } from './TopNav';
import { UserSmallInfoModule } from '../users/UserHeaderBlock';
import { DropDownModule } from './DropDownList';

@NgModule({
      imports: [CommonModule, RouterModule, UserSmallInfoModule, DropDownModule, MenuBlockModule],
      exports: [
        TopNavComponent
      ],
      declarations: [
        TopNavComponent,
      ],
      // providers: [AuthService, UserAuthModel],
})
export class NavigationModule {}
