export interface IHaveSRC {
  src: string;
}

export interface IHaveKey {
  key: string;
}

export interface IImageModel {
  src: string;
}

export interface IHaveImage {
  image: AbstractImageModel;
}

export abstract class AbstractImageModel implements IHaveSRC {
  protected _src: string;
  get src(){
    return this._src;
  }
  constructor(obj: IImageModel){
    this._src = obj.src;
  }
}
