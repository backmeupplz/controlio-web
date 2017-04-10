import { IHaveImage, IHaveKey } from '../../Image';
import { ImageModel } from '../../Image';

export class ImageElementModel implements IHaveImage, IHaveKey {
  protected _image: ImageModel;
  get image() : ImageModel {
    return this._image;
  }
  set image(image: ImageModel){
    this._image = image;
  }
  protected _key: string;
  get key() : string {
    return this._key;
  }
  constructor(obj: IHaveImage & IHaveKey){
    this._image = obj.image;
    this._key = obj.key;
  }
}
