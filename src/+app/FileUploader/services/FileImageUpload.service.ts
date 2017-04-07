import { Injectable } from '@angular/core';
import { FileUploadService } from './FileUpload.service';
import { Observable } from 'rxjs/Observable';
import { FileImageModel } from '../../Files/models';
import { ImageModel } from '../../Image';
import { BucketService } from '../../bucket/bucket.service';

@Injectable()
export class FIleImageUploadService {
  constructor(private fileUploadService: FileUploadService, private bucketService: BucketService) {}

  loadFileImage(key: string) : Observable<FileImageModel> {
    return this.fileUploadService.loadData(key).map(res=>{
      let file = new FileImageModel( key, res, true );
      file.image = new ImageModel({ src: res.src })
      return file;
    })
  }

  getCachedImg(key: string) : FileImageModel {
    let src = this.bucketService.getCachedImg(key)
    if(!src == null) return null;
    let file = new FileImageModel( key, "", true );
    file.image = new ImageModel({ src: src })
    return file;
  }
}
