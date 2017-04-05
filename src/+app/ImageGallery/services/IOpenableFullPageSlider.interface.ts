import { AbsctractGalleryModel } from '../models';
import { IHaveImage } from '../../Image';

export interface IOpenableFullPageSlider <T extends IHaveImage, B extends AbsctractGalleryModel<T>> {
  gallery: B;
  openSlider(index?: number): boolean;
}
