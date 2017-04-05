import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullPageImageSlider } from './FullPageImageSlider';
import { ImageGallery } from './ImageGallery.component';
import { ImageGalleryService } from './ImageGallery.service';
import { SvgModule } from '../Svg';
import { ImageModule } from '../Image';
import { BootstrapHelperModule } from '../BootstrapHelper';
import { CircularGallery } from './models';

@NgModule({
      imports: [CommonModule, SvgModule, ImageModule, BootstrapHelperModule],
      exports: [FullPageImageSlider,ImageGallery],
      declarations: [FullPageImageSlider, ImageGallery],
})
export class GalleryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GalleryModule,
      providers: [ImageGalleryService, CircularGallery]
    }
  }
}
