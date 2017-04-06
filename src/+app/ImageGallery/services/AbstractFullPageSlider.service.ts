import { AbsctractGalleryModel } from '../models';
import { IOpenableFullPageSlider } from './IOpenableFullPageSlider.interface';

export abstract class AbstractFullPageSliderService <B, T extends AbsctractGalleryModel<B>> implements
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


