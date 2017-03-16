import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { ImageGalleryService } from './ImageGallery.service';
// import { ImageGalleryModel } from './ImageGallery.model';
// import { FilesGalleryModel } from './FilesGallery.model';
// import { ImageClass } from '../imgb/imgb.class';
// import { ImageModel } from '../imgb/imgb.model';
// import { FileModel } from '../form-elements/File.model';
// import { FileImage } from '../form-elements/FileImage.model';
import { FileCollection } from '../models';
import { FileModel } from '../../Files/models';

@Component({
  selector: 'cn-collection',
    styles: [`
      :host {
        display: inline-flex;
        flex-basis: 100%;
        justify-content: flex-start;
        min-height: 60px;
      }

      .remove-icon {
        display: none;
        background: red;
        top: 0;
        margin: -5px;
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

      .ng-gallery .file-block:hover .remove-icon {
        display: flex;
      }

      .file-block {
        position: relative;
        margin-left: 15px;
      }

      .file-type {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 6px 10px;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        font-family: sans-serif;
      }

      .file-title {
        width: 120px;
        height: 100%;
        overflow: hidden;
        border-radius: 3px;
        background: #b0a4fd;
        font-size: 8px;
      }

      .file-name {
        color: #fff;
        padding: 5px;
        font-size: 10px;
        height: 60%;
        overflow: hidden;
      }
     `],
   template: `
   <div *ngIf="collection" class="{{ _stylesMain }}">
     <div *ngFor ="let file of collection; let index = index" class="file-block">
        <!-- file-image [file]="file" *ngIf="file.image"></file-image -->
        <div *ngIf="!file.image" class="file-title">
          <p class="file-name">{{ file.shortName }}</p>
          <p class="file-type">{{ file.type }}</p>
        </div>
      <!-- span class="remove-icon glyphicon glyphicon-remove" aria-hidden="true" (click)="removeFile(file)" *ngIf="editable && !file.isLoad"></span -->
      </div>
   </div>
       `
})
export class CollectionComponent {

  @Input('collection') fileCollection: FileCollection<FileModel>;

  public _styles: string = "ng-thumb";
  @Input()
  set styles(styles: string){
    this._styles += " " + styles;
  }


/*
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
  public _gallery: FilesGalleryModel;


  //private progressLoads: any = {};
  @Output() galleryChange = new EventEmitter();
  @Input('gallery')
  set gallery(gallery: FilesGalleryModel){
    if(!gallery) return;
    console.log("gallery change!!");
    this._gallery = gallery;
    this._gallery.files.forEach((elem)=>{
      if( elem instanceof FileImage){
        elem.loadImage();
      }
      if(!elem.isUploaded){
        elem.callbackProgress = (progress)=>{
          console.log("gallery", elem.progress);
        };
        elem.callbackAfter = (err, res)=>{
          console.log("Load from galleryChange isUpload!");
        }
      }
    })
    this.galleryChange.emit(this._gallery);
  }
  get gallery(){
    return this._gallery;
  }


  @Input('editable') public editable: boolean = false;
  constructor(private imageGalleryService: ImageGalleryService) {

  }

  ngOnInit(){
    //console.log("gallery", this.gallery );
  }

  @Output() removeEvent = new EventEmitter<any>();
  removeFile(file: FileModel){
    console.log("remove file:", file);
    this.gallery.removefile(file);
    this.removeEvent.emit(file);
  }


  openGallery(index) {
    // this.gallery.index = index;
    // this.imageGalleryService.setImages( this.gallery )
    // this.opened = true;
    // for (var i = 0; i < this.gallery.images.length; i++) {
    //   if (i === this.currentImageIndex ) {
    //     this.imgSrc = this.gallery.images[i].str;
    //     this.loading = false;
    //     break;
    //   }
    // }
  }*/
}
