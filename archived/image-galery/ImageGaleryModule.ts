import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { MBootstrapModule } from '../bootstrap-components/MBootstrapModule.module';
import { ImageModal } from './ImageGalleryBase.component';
import { ImageSmallGallery } from './ImageGalleryBaseSmall.component';
import { ImageGallery } from './ImageGallery.component';
import { ImageGalleryService } from './ImageGallery.service';
import { ImageComponent } from '../img.component';
import { BemModule } from 'angular-bem';
import { BucketService } from '../../bucket/bucket.service';
import { ImageBackgroudComponent } from '../imgsb.component';
import { AppHttp } from '../http/AppHttp.service';
import { AppHeaders } from '../http/AppHeaders.service';
import { CircleProgressComponent } from '../progress-circle/circle-progress.component';
import { FileImageComponent } from './file-image.component';

@NgModule({
  imports: [
    BemModule,
    CommonModule,
    MBootstrapModule
  ],
  declarations: [
    ImageGallery,
    ImageModal,
    ImageSmallGallery,
    ImageComponent,
    ImageBackgroudComponent,
    CircleProgressComponent,
    FileImageComponent
  ],
  providers: [
    ImageGalleryService,
    BucketService,
    AppHttp,
    AppHeaders,
  ],
  exports: [
    ImageGallery, ImageSmallGallery, ImageModal,
    ImageBackgroudComponent,
    ImageComponent
  ]
})
export class ImageGaleryModule {}
