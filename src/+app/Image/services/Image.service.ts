import { Injectable } from '@angular/core';
import { FIleImageUploadService } from '../../FileUploader/services';
import { Observable } from 'rxjs/Observable';
import { AbstractImageModel } from '../AbstractImage.model';
import { ImageModel } from '../Image.model';

@Injectable()
export class ImageService {
  constructor(private fileUploadService: FIleImageUploadService) {}

  downloadImage(key: string) : Observable<AbstractImageModel>{
    return this.fileUploadService.loadFileImage(key).map((file)=>{
      return file.image;
    })
  }

  getCachedImg(key: string) : ImageModel {
    let cachedImg = this.fileUploadService.getCachedImg(key);
    if(cachedImg == null) return null;
    return cachedImg.image;
  }
}
