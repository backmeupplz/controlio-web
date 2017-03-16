import { NgModule } from '@angular/core';
import { SvgIconComponent }   from './SvgIcon/SvgIcon.component';
import { BemModule } from 'angular-bem';

@NgModule({
      imports: [BemModule],
      exports: [SvgIconComponent],
      declarations: [SvgIconComponent],
      providers: [],
})
export class SvgModule {}
