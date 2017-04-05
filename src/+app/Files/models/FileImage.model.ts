import { AbstractImageModel, ImageModel, IHaveSRC, IHaveImage } from '../../Image';
import { FileModel } from './File.model';

export class FileImageModel extends FileModel implements IHaveImage {
	constructor(key: string, file: any, isUploaded?: boolean, name?: string){
    super(key, file, isUploaded, name);
	}

  /**
  *  property isImage
  *  @return {boolean} true
  */
  get isImage(){
    return true;
  }

  /**
  *  Image data
  */
  protected _image: AbstractImageModel;
  get image() : AbstractImageModel {
    return this._image || this.preview;
  }
  set image(image: AbstractImageModel){
    this._image = image;
  }

  /**
  *  Preview image
  */
  protected _preview: AbstractImageModel;
  get preview(){
    return this._preview;
  }

  /**
  *  Load preview image for this AbstractImageModel
  *  @param {callback} callback
  *  @callback {any, AbstractImageModel} preview
  */
  loadPreview( callback?: (err: any, res: AbstractImageModel) => any ){
    let reader = new FileReader();
    reader.onloadend = ()=>{
      this._preview = new ImageModel({ src: reader.result })
      if( callback ) callback(null, this._preview)
    }
    reader.onerror = (err)=>{
      if( callback ) callback(err, null)
    }
    console.log(this._file)
    reader.readAsDataURL( this._file );
  }
}
