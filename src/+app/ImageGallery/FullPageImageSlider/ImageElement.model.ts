import { IHaveImage } from '../../Image';
import { ImageModel } from '../../Image';

export class ImageElementModel implements IHaveImage {
  protected _image: ImageModel;
  get image() : ImageModel {
    return this._image;
  }
  set image(image: ImageModel){
    this._image = image;
  }
  constructor(obj: IHaveImage){
    this._image = obj.image;
  }
}
