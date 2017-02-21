import { NgModule } from '@angular/core';
import { IconComponent } from './IconComponent/Icon.component';
import { SvgModule } from '../../Svg';

@NgModule({
  imports: [SvgModule],
  declarations: [IconComponent],
  providers: [],
  exports: [IconComponent]
})
export class MBootstrapModule {}
