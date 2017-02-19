import { NgModule } from '@angular/core';
import { DropDownList }   from './drop-down-list.component';
import { LanguageDropDownList } from './language-drop-down-list.component';
import { AuthService } from '../../auth/AuthServices';
import { UserDropDownList } from './user-drop-down-list.component';
import { BurgerDropDownList } from './burger-drop-down-list.component';
import { CommonModule } from '@angular/common';
import { MenuBlockModule } from '../MenuBlock';

@NgModule({
      imports: [CommonModule, MenuBlockModule],
      exports: [LanguageDropDownList, UserDropDownList, BurgerDropDownList],
      declarations: [DropDownList, LanguageDropDownList, UserDropDownList, BurgerDropDownList],
      providers: [AuthService],
})
export class DropDownModule {}
