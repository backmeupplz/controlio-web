import { Injectable, Inject } from '@angular/core';
import { BucketService } from '../../bucket/bucket.service';
import { NativeWindow } from '../NativeWindow.service';
import { ImageModel } from '../imgb/imgb.model';
import { FileImage } from './FileImage.model';
import { FileModel } from './File.model';
import { LocalStorage } from '../local-storage';
import { FilesGalleryModel } from '../image-galery/FilesGallery.model';

@Injectable()
export class FileUploadService {

	constructor( private bucketService: BucketService,
               private nativeWindow: NativeWindow,
               @Inject(LocalStorage) private localStorage ){}


  checkExt(fileName: string, ext: string[]){
    
  	let str = fileName.split(".");
  	let format = str[str.length - 1];
  	let res = ext.findIndex( val => { return val == format; });
  	return res != -1;
  }

  createFile( file: any ){
    if(!file) return null;

    let fileName = file.name;
    let newFile = null;

    const self = this;
    if( this.checkExt(fileName, ['jpeg','png','jpg'])){
      newFile = new FileImage(this.generateKey( file ), file, false, fileName);
      newFile.loadImageMethod = ( file, callback )=>{
        self.getImagePreview( file, ( err: any, img: ImageModel )=>{
          newFile.image = img;
          if(callback) callback(null, img);
        }, newFile.key );
      };
    } else newFile = new FileModel(this.generateKey( file ), file, false, fileName);

   
    return newFile;
  }



  uploadGallery( gallery: FilesGalleryModel ){
    if(!gallery) return;
    gallery.files.forEach((file)=>{
     
      if(!file.isUploaded){
        file.setLoad();
        this.uploadOn(file.key, file.file, file.loadFile, file.loadFileProgress );
      }
    });
  }


  // For upload file on server
  // callback (err, res)=>{}
  uploadOn( key: string, file: any, callback: any, callabackUploadProgress?: any ){
  	if( callback != undefined && callback != null && key.length > 0 && file != undefined ){
  		if( file == undefined || key == undefined ){
        callback( true, null);
        if(callabackUploadProgress) callabackUploadProgress(-1)
      }
      this.bucketService.uploadImage( key, file, callabackUploadProgress ).subscribe((res)=>{
        
        callback(null, res);
      }, (err)=>{
        callback(err, null);
      });
	  }
	}



  getImagePreview( file: any, callback: any, fileKey?: string ){
    let reader = new FileReader();
    reader.onloadend = function () {
      let image = new ImageModel(reader.result, false, file.name, fileKey);
      callback(null, image)
    }
    reader.readAsDataURL( file );
  }

  // For generate key for bucket upload
  generateKey( file: any ){
  	return (file.name != undefined ) ? this.getStringFormat( file.name ) : null;
  }

  getStringFormat( name ){
    let format = name.split(".");
    format = format[format.length - 1];
    let userId = this.localStorage.getItem('userId');
    let uniqueString =  Math.random().toString(36).substring(7);
    let timestamp = Date.now() / 1000 | 0;
     let str = userId + "/" + uniqueString + "-" + timestamp + "." + format;
    return str;
  }
}
