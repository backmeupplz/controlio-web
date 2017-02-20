import { NgModule } from '@angular/core';
import { MenuBlockModule } from './MenuBlock';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthServiceModule } from '../auth';
import { TopNavComponent } from './TopNav';
import { UserSmallInfoModule } from '../users/UserHeaderBlock';
import { DropDownModule } from './DropDownList';

@NgModule({
      imports: [
        CommonModule, 
        RouterModule, 
        UserSmallInfoModule, 
        DropDownModule, 
        MenuBlockModule, 
        AuthServiceModule
      ],
      exports: [
        TopNavComponent
      ],
      declarations: [
        TopNavComponent,
      ]
})
export class NavigationModule {}
