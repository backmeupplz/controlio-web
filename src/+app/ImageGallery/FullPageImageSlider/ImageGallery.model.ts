import { AbsctractGalleryModel, CircularGallery } from '../models';
import { ImageElementModel } from './ImageElement.model';
import { IHaveImage } from '../../Image';

export class ImageGalleryModel extends AbsctractGalleryModel<ImageElementModel> {
  constructor(data: IHaveImage[], service: CircularGallery<any>){
    let elements = data.map((elem)=>{
      return new ImageElementModel(elem);
    });
    super(elements, service);
  }
}
