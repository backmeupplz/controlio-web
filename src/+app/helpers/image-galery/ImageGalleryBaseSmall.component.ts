import {Component, Input, Output,EventEmitter, OnInit} from '@angular/core';
import { ImageGalleryService } from './ImageGallery.service';
import { ImageGalleryModel } from './ImageGallery.model';
import { ImageClass } from '../imgb/imgb.class';
import { ImageModel } from '../imgb/imgb.model';

@Component({
    selector: 'ImageSmallGallery',
    styles: [`
      :host {
        display: inline-flex;
        flex-basis: 100%;
        justify-content: flex-start;
      }

      .remove-icon {
        display: none;
        background: red;
        top: 0;
        margin: -12%;
        left: 0;
        position: absolute;
        height: 18px;
        align-self: center;
        width: 18px;
        border-radius: 50%;
        text-align: center;
        font-size: .6em;
        line-height: 18px;
        color: #fff;
        background: #f45858;
        justify-content: center;
      }

      .ng-gallery:hover .remove-icon {
        display: flex;
      }
     `],
   template: `
   <div *ngIf="gallery" class="{{ _stylesMain }}">
     <div *ngFor ="let image of gallery.images; let index = index" class="thumbnail" style="-webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);">
       <imgb [image]="image" [styles]="_styles" (click)="openGallery(index)"></imgb>
       <span class="remove-icon glyphicon glyphicon-remove" aria-hidden="true" (click)="removeImage(image)" *ngIf="editable"></span>
      </div>
   </div>
       `
})
export class ImageSmallGallery {
  public _styles: string = "ng-thumb";
  @Input()
  set styles(styles: string){
    this._styles += " " + styles;
  }

  public _stylesMain: string = "ng-gallery";
  @Input()
  set stylesmain(stylesMain: string){
    this._stylesMain += " " + stylesMain;
  }
  public _element:any;
  public opened:boolean = false;
  public imgSrc:string;
  public currentImageIndex:number;
  public loading:boolean= false;
  @Input('gallery') public gallery: ImageGalleryModel;
  @Input('editable') public editable: boolean = false;
  constructor(private imageGalleryService: ImageGalleryService) {}

  ngOnInit(){
    //console.log("gallery", this.gallery );
  }

  @Output() removeEvent = new EventEmitter<any>();
  removeImage(image: ImageModel){
    this.gallery.removeImage(image);
    this.removeEvent.emit(image);
  }

  openGallery(index) {
    this.gallery.index = index;
    this.imageGalleryService.setImages( this.gallery )
    this.opened = true;
    for (var i = 0; i < this.gallery.images.length; i++) {
      if (i === this.currentImageIndex ) {
        this.imgSrc = this.gallery.images[i].str;
        this.loading = false;
        break;
      }
    }
  }
}
