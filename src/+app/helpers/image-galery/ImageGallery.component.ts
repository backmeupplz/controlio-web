import {Component, OnInit} from '@angular/core';
import { ImageGalleryService } from './ImageGallery.service';
import { ImageGalleryModel } from './ImageGallery.model';

@Component({
    selector : 'img-gallery',
    template:  `
      <div *ngIf="openModalWindow">
        <ImageModal [gallery]="gallery" (cancelEvent) ="cancelImageModel()"></ImageModal>
      </div>
  `
})
export class ImageGallery {
  openModalWindow:boolean=false;
  imagePointer:number;
  public gallery: ImageGalleryModel;
  constructor(private imageGalleryService: ImageGalleryService) {}

  ngOnInit(){
    this.imageGalleryService.gallery$.subscribe(
    value => {
      if(value){
        this.gallery = value;
        this.openModalWindow = true;
        return;
      }
    });
  }

 OpenImageModel(imageSrc,images) {
   //alert('OpenImages');
   var imageModalPointer;
   for (var i = 0; i < images.length; i++) {
          if (imageSrc === images[i].img) {
            imageModalPointer = i;
            console.log('jhhl',i);
            break;
          }
     }
   this.openModalWindow = true;
   this.gallery.images = images;
   this.imagePointer  = imageModalPointer;
 }
 cancelImageModel() {
   this.openModalWindow = false;
 }
}
