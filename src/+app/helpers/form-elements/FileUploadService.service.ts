import { Injectable } from '@angular/core';
import { BucketService } from '../../bucket/bucket.service';
import { NativeWindow } from '../NativeWindow.service';
import { ImageModel } from '../imgb/imgb.model';
import { FileImage } from './FileImage.model';

@Injectable()
export class FileUploadService {

	private _ext: string[] = [];
	get ext(){
		return this._ext;
	}
	set ext( ext: string[] ){
		this._ext = ext;
	}

	constructor( private bucketService: BucketService, private nativeWindow: NativeWindow ){}


  checkExt(fileName: string){
  	let str = fileName.split(".");
  	let format = str[str.length - 1];
  	let res = this.ext.findIndex( val => { return val == format; });
  	return res != -1;
  }

  createImageFile( data ){
    const self = this;
    let newFile = new FileImage(this.generateKey( data ), data);
    newFile.loadImageMethod = ( file, callback )=>{
      self.getImagePreview( newFile.file, ( err: any, img: ImageModel )=>{
        file.img = img;
        callback(null, img);
      }, newFile.key );
    };

    return newFile;
  }

  // For preview image before upload
  getImagePreview( file: any, callback: any, fileKey?: string ){
    var img = document.createElement("img");
    console.log(file);
    let src = this.nativeWindow.createObjectURL( file );

    var reader: any, target: EventTarget;
    reader = new FileReader();
    reader.addEventListener("load", (event) => {
      let image = new ImageModel(src, false, file.name, fileKey);
      callback(null, image)
    }, false);
    reader.readAsDataURL( file );
  }



  // For upload file on server
  // callback (err, res)=>{}
  uploadOn( key: string, file: any, callback: any ){
  	if( callback != undefined && callback != null && key.length > 0 && file != undefined ){
  		if( file == undefined || key == undefined ) callback( true, null);
      this.bucketService.uploadImage( key, file ).subscribe((res)=>{
        callback(null, res);
      }, (err)=>{
        callback(err, null);
      });
	  }
	}




  // For generate key for bucket upload
  generateKey( file: any ){
  	return (file.name != undefined ) ? this.getStringFormat( file.name ) : null;
  }

  getStringFormat( name ){
    let format = name.split(".");
    format = format[format.length - 1];
    let userId = localStorage.getItem('userId');
    let uniqueString =  Math.random().toString(36).substring(7);
    let timestamp = Date.now() / 1000 | 0;
     let str = userId + "/" + uniqueString + "-" + timestamp + "." + format;
    return str;
  }
}
