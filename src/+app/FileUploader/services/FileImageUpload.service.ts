import { Injectable } from '@angular/core';
import { FileUploadService } from './FileUpload.service';
import { Observable } from 'rxjs/Observable';
import { FileImageModel } from '../../Files/models';

@Injectable()
export class FIleImageUploadService {
  constructor(private fileUploadService: FileUploadService) {}

  loadFileImage(key: string) : Observable<FileImageModel> {
    return this.fileUploadService.loadData(key).map(res=>{
      return new FileImageModel("","");
    })
  }
}
