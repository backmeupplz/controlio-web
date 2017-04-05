import { AbsctractGalleryModel } from '../models';
import { IOpenableFullPageSlider } from './IOpenableFullPageSlider.interface';
import { IHaveImage } from '../../Image';

export abstract class AbstractFullPageSliderService <B extends IHaveImage, T extends AbsctractGalleryModel<B>> implements
IOpenableFullPageSlider<B,T> {
  constructor() {}
  protected _gallery: T;
  get gallery(){
    return this._gallery;
  }
  openSlider(){
    return true;
  }
}


