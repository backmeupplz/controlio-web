import {Component, Input,Output,ElementRef,EventEmitter,OnInit} from '@angular/core';
import { ImageGalleryModel } from './ImageGallery.model';
import { ImageModel } from '../imgb/imgb.model';

@Component({
    selector: 'ImageModal',
   template: `
   <div class="ng-overlay" *ngIf="opened">
    <div class="ng-gallery-content" >
    <div class="uil-ring-css" *ngIf="loading"><div></div></div>         
    <a class="close-popup" (click)="closeGallery()"><i class="fa fa-close">Close</i></a>
     <a class="nav-left" *ngIf="gallery.images.length >1" (click)="prevImage()"><i class="fa fa-angle-left">Left</i></a>
     <imgb *ngIf="!loading" [image]="image" [styles]="styles" (click)="nextImage()" class="effect"></imgb>
     <a class="nav-right" *ngIf="gallery.images.length >1" (click)="nextImage()"><i class="fa fa-angle-right">Right</i></a>
     <span class="info-text">{{ currentImageIndex + 1 }}/{{ gallery.images.length }} - Image {{currentImageIndex+1}}</span>
   </div>
   </div>
       ` 
})
export class ImageModal implements OnInit {
  private styles: string = "img-border-width";
   public _element:any;
   public opened:boolean = false;
   public image: ImageModel;
   public currentImageIndex:number;
   public loading:boolean= false;
   public showRepeat:boolean= false;
  @Input('gallery') public gallery: ImageGalleryModel;
  @Output('cancelEvent') cancelEvent = new EventEmitter<any>();
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
      this.loading = true;
      if(this.gallery.index >= 0) {
      this.showRepeat = false;
      this.openGallery(this.gallery.index);
    } else {
      this.showRepeat = true;
    }
  }
  closeGallery() {
    this.opened = false;
    this.cancelEvent.emit(null);
  }
  prevImage() {
    this.loading = true;
    this.currentImageIndex--;
    if(this.currentImageIndex < 0) {
      this.currentImageIndex = this.gallery.images.length-1  ;
    }
    this.openGallery(this.currentImageIndex);
  }
  nextImage() {
    this.loading = true;
    this.currentImageIndex++;
    if(this.gallery.images.length === this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    this.openGallery(this.currentImageIndex);

  }
  openGallery(index) {
    if(!index) {
    this.currentImageIndex = 1;
    }
    this.currentImageIndex = index;
      this.opened = true;
     for (var i = 0; i < this.gallery.images.length; i++) {
            if (i === this.currentImageIndex ) {
              console.log(i, "asdf",this.gallery.images[i],"1234123", this.gallery.images)
              this.image = this.gallery.images[i];
              this.loading = false;
              break;
            }
       }
  }
}
