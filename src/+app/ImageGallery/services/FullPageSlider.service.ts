import { AbsctractGalleryModel } from '../models';
import { IOpenableFullPageSlider } from './IOpenableFullPageSlider.interface';
import { AbstractFullPageSliderService } from './AbstractFullPageSlider.service';
import { ImageElementModel, ImageGalleryModel } from '../FullPageImageSlider';
import { Injectable } from '@angular/core';

@Injectable()
export class FullPageSliderService extends AbstractFullPageSliderService<ImageElementModel,ImageGalleryModel> {
  set gallery( collection: ImageGalleryModel ){
    this._gallery = collection;
  }
}

