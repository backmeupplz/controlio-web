import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileImageComponent }   from './File.component';
import { CircleProgressComponent } from './progress-circle/circle-progress.component';
import { ImageModule } from '../Image';
import { SvgModule } from '../Svg';
import { BemModule } from 'angular-bem';

@NgModule({
      imports: [CommonModule, ImageModule, SvgModule, BemModule],
      exports: [FileImageComponent, CircleProgressComponent],
      declarations: [FileImageComponent, CircleProgressComponent],
      providers: [],
})
export class FIleModule {  }
