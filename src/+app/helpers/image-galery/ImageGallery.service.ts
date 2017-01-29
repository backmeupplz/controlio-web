import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';
import { ImageGalleryModel } from './ImageGallery.model';

@Injectable()
export class ImageGalleryService {

  gallery: ImageGalleryModel;
  private galleryChange = new Subject<any>();
  gallery$ = this.galleryChange.asObservable()

  setImages( gallery: ImageGalleryModel ) {
    this.galleryChange.next(gallery);
  }

}