import { Injectable } from '@angular/core';
import { IFileLoader } from './IFileLoader.interface';
import { FileModel } from '../Files';
import { FileUploadService } from '../FileUploader/services';

@Injectable()
export class FileService implements IFileLoader {
  constructor(private fileUploadService: FileUploadService) {}
  loadFile(key: string){
    return this.fileUploadService.loadFile(key);
  }
}
