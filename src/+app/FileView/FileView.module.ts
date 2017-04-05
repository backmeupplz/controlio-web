import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileImageComponent }   from './File.component';
import { CircleProgressComponent } from './progress-circle/circle-progress.component';
import { ImageModule } from '../Image';

@NgModule({
      imports: [CommonModule, ImageModule],
      exports: [FileImageComponent, CircleProgressComponent],
      declarations: [FileImageComponent, CircleProgressComponent],
      providers: [],
})
export class FIleModule {  }
