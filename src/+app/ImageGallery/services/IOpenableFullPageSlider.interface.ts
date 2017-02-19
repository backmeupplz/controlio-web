import { AbsctractGalleryModel, AbstractElementModel } from '../models';
export interface IOpenableFullPageSlider <T extends AbstractElementModel, B extends AbsctractGalleryModel<T>> {
  gallery: B;
  openSlider(index?: number): boolean;
}
