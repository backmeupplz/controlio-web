import { AbsctractGalleryModel } from '../models';
export interface IOpenableFullPageSlider <T, B extends AbsctractGalleryModel<T>> {
  gallery: B;
  openSlider(index?: number): boolean;
}
