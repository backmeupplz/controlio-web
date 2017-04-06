import { Injectable } from '@angular/core';
import { FileModel } from '../../Files/models';
import { FileKeyGenService } from './FileKeyGen.service';

@Injectable()
export class FileFactoryService {
  constructor(private fileKeyGenService: FileKeyGenService) {}

  // Создание картинки
  createFile(file: any){
    if(!file) return null;

    let fileName = file.name;
    let newFile = null;

    const self = this;
    // if( this.checkExt(fileName, ['jpeg','png','jpg'])){
    //   newFile = new FileImage(this.generateKey( file ), file, false, fileName);
    //   newFile.loadImageMethod = ( file, callback )=>{
    //     self.getImagePreview( file, ( err: any, img: ImageModel )=>{
    //       newFile.image = img;
    //       if(callback) callback(null, img);
    //     }, newFile.key );
    //   };
    // }
    //else
    newFile = new FileModel(this.fileKeyGenService.generateKey( file ), file, false, fileName);

    return newFile;
  }
  // Создание файла

}
