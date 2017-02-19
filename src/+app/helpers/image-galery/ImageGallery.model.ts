import { ImageModel } from '../imgb/imgb.model';
import { IRemovableImage } from './IRemovableImage.interface';

export class ImageGalleryModel {
	public index: number = 1;
  private _images: ImageModel[] = [];
 	get images(){
 		return this._images;
 	}
  set images(images: ImageModel[]){
    this._images = images;
  }
 	setOneImage(image: ImageModel){
 		this._images = [image];
 	}


 	private instance: any;
	constructor(images?: ImageModel[], instance?: IRemovableImage ){
		if(images) this._images = images;
		if(instance) this.instance = instance;
	}

	addImage(image: ImageModel){
		if(image) this._images.push(image);
	}

	removeImageFromStr(str: string){
		let index = -1;
		for(let i=0;i<this._images.length;i++){
			if(this._images[i].str == str){
				index = i;
				break;
			}
		}
		if(index >= 0 ) {
			let image = this.images.splice(index, 1)[0];
			console.log("Remove: ", image, this.instance);
			if( this.instance != null && this.removeImageFromInstance(this.instance)){
				this.instance.removeImage(image);
			} else {
				console.error("This object ", this.instance, " should be has removeImage method!");
			}
		}
	}

	removeImage(image: ImageModel){
		this.removeImageFromStr(image.str);
	}

	removeImageFromInstance(arg: any): arg is IRemovableImage {
  	return (arg as IRemovableImage).removeImage !== undefined;
 	}
}
