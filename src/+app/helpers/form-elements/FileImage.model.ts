import { ImageModel } from '../imgb/imgb.model';
export class FileImage {
	private _file: any;
	get file(){
		return this._file;
	}

	private _key: string;
	get key(){
		return this._key;
	}

	private _loadImage: any;
	set loadImageMethod(method: any){
		this._loadImage = method;
	}

	private _image: ImageModel;
	get image(){
		return this._image;
	}
	
	loadImage(callback: any){
		this._loadImage(this._file, callback);
	}

	constructor(key: string, file: any){
		this._key = key;
		this._file = file;
	}
}