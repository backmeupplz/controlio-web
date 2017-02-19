import { AbstractImageModel, IImageModel } from './AbstractImage.model';

export class ImageModel extends AbstractImageModel {
  constructor(obj: IImageModel){
    super(obj);
  }
}
