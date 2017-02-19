import { AbstractImageModel, IHaveImage } from '../../Image';
export class ImageElementModel implements IHaveImage {
  protected _image: AbstractImageModel;
  get image() : AbstractImageModel {
    return this._image;
  }
  set image(image: AbstractImageModel){
    this._image = image;
  }
  constructor(obj: IHaveImage){
    this._image = obj.image;
  }
}
