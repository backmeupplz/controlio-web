import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent }   from './Post/post.component';
import { BemModule } from 'angular-bem';
import { SvgModule } from '../Svg';
import { MomentModule } from 'angular2-moment';
import { PostService } from './PostServices';
import { ImageModule } from '../Image';

@NgModule({
      imports: [BemModule, SvgModule, MomentModule, CommonModule, ImageModule],
      exports: [PostComponent],
      declarations: [PostComponent],
      providers: [],
})
export class PostModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PostModule,
      providers: [PostService]
    }
  }
}
