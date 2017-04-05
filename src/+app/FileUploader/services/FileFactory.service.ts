import { Injectable } from '@angular/core';
import { FileModel, FileImageModel } from '../../Files/models';
import { FileKeyGenService } from './FileKeyGen.service';
import { ImageModel } from '../../Image';

@Injectable()
export class FileFactoryService {
  constructor(private fileKeyGenService: FileKeyGenService) {}

  // Создание картинки
  createFile(file: any){
    if(!file) return null;

    let fileName = file.name;
    let newFile = null;

    const self = this;
    if( this.fileKeyGenService.checkExt(fileName, ['jpeg','png','jpg'])){
      newFile = new FileImageModel(this.fileKeyGenService.generateKey( file ), file, false, fileName);
    }
    else {
      newFile = new FileModel(this.fileKeyGenService.generateKey( file ), file, false, fileName);
    }
    return newFile;
  }
  // Создание файла

}
