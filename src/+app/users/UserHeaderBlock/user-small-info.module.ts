import { NgModule } from '@angular/core';
import { UserSmallInfoComponent }   from './user-small-info.component';
import { CommonModule } from '@angular/common';
import { DropDownModule } from '../../Navigation/DropDownList';

@NgModule({
      imports: [CommonModule, DropDownModule],
      exports: [UserSmallInfoComponent],
      declarations: [UserSmallInfoComponent],
      providers: [],
})
export class UserSmallInfoModule {}
