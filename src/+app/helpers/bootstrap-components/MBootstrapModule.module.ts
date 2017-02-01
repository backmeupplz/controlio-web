import { NgModule } from '@angular/core';
import { IconComponent } from './IconComponent/Icon.component';
import { SvgIconComponent } from '../form-elements/SvgIcon.component';

@NgModule({
  imports: [],
  declarations: [IconComponent,SvgIconComponent],
  providers: [],
  exports: [IconComponent,SvgIconComponent]
})
export class MBootstrapModule {}
