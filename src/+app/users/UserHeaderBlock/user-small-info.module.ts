import { NgModule } from '@angular/core';
import { UserSmallInfoComponent }   from './user-small-info.component';
import { CommonModule } from '@angular/common';
import { DropDownModule } from '../../Navigation/DropDownList';
import { ImageModule } from '../../Image';

@NgModule({
      imports: [CommonModule, DropDownModule, ImageModule],
      exports: [UserSmallInfoComponent],
      declarations: [UserSmallInfoComponent],
      providers: [],
})
export class UserSmallInfoModule {}
