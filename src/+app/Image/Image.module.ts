import { NgModule, ModuleWithProviders } from '@angular/core';
import { ImageComponent, ImageKeyComponent } from './ImageComponent';
import { ImageService } from './services';
import { FIleImageUploadService } from '../FileUploader/services';
import { CommonModule } from '@angular/common';

@NgModule({
      imports: [CommonModule],
      exports: [
        ImageComponent,
        ImageKeyComponent
      ],
      declarations: [
        ImageComponent,
        ImageKeyComponent
      ]
})
export class ImageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImageModule,
      providers: [ImageService, FIleImageUploadService]
    }
  }
}

