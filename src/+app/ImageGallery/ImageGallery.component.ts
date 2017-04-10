import {Component, OnInit} from '@angular/core';
import { ImageGalleryService } from './ImageGallery.service';
import { ImageGalleryModel } from './FullPageImageSlider/ImageGallery.model';

@Component({
    selector : 'img-gallery',
    template:  `
      <div *ngIf="openModalWindow">
        <fullPageImageSlider [opened]="openModalWindow" [gallery]="gallery" (cancelEvent)="cancelImageModel()"></fullPageImageSlider>
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
        this.gallery = value.gallery;
        if(typeof value.index === "number"){
          this.gallery.setIndex(value.index);
        } else {
          this.gallery.setIndexFromElem(value.index);
        }
        this.openModalWindow = true;
        return;
      }
    });
  }

  OpenImageModel(imageSrc,images) {
   //alert('OpenImages');
   // var imageModalPointer;
   // for (var i = 0; i < images.length; i++) {
   //        if (imageSrc === images[i].img) {
   //          imageModalPointer = i;
   //         
   //          break;
   //        }
   //   }
   this.openModalWindow = true;
   // this.gallery.images = images;
   // this.imagePointer  = imageModalPointer;
  }
  cancelImageModel() {
    this.openModalWindow = false;
  }
}
