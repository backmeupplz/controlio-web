import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { ImageGalleryService } from './ImageGallery.service';
// import { ImageGalleryModel } from './ImageGallery.model';
// import { FilesGalleryModel } from './FilesGallery.model';
// import { ImageClass } from '../imgb/imgb.class';
// import { ImageModel } from '../imgb/imgb.model';
// import { FileModel } from '../form-elements/File.model';
// import { FileImage } from '../form-elements/FileImage.model';
import { FileCollection } from '../models';
import { FileModel, FileImageModel } from '../../Files/models';
import { ImageGalleryService } from '../../ImageGallery';
// import { ImageGalleryModel } from '../../ImageGallery/FullPageImageSlider/ImageGallery.model';
import { CircularGallery, ImageGalleryModel } from '../../ImageGallery';

@Component({
  selector: 'cn-collection',
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

      .file-block:hover .remove-icon {
        display: flex;
      }

      .file-block {
        position: relative;
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

      .file-block {
        height: 100%;
      }

      .photo-mini {
        height: 60px;
        width: 60px;
      }

      .photo-mini >>> img {
        border-radius: 2px;
      }

      .collection-main {
        display: inline-flex;
      }

      .file-block {
        margin-right: 15px;
      }
     `],
   template: `
   <div *ngIf="collection" class="collection-main {{ _stylesMain }}">
     <div *ngFor ="let file of collection; let index = index" class="file-block">
        <div *ngIf="!file.preview" class="file-title">
          <p class="file-name">{{ file.shortName }}</p>
          <p class="file-type">{{ file.type }}</p>
        </div>
        <file-image [file]="file" [image]="file.preview" *ngIf="file.preview" (click)="openGallery(index)"></file-image>
        <!--cn-img *ngIf="file.preview" [image]="file.preview" class="photo-mini" styles="ng-thumb"></cn-img-->
        <span class="remove-icon glyphicon glyphicon-remove" aria-hidden="true" (click)="removeFile(file)" *ngIf="editable && !file.isLoad"></span>
      </div>
   </div>
       `
})
export class CollectionComponent {

  constructor(private imageGalleryService: ImageGalleryService, private circularGallery: CircularGallery<FileModel>) {}

  @Input() editable: boolean = true;
  private _collection: FileCollection<FileModel>;
  @Input('collection')
  set collection(collection: FileCollection<FileModel>){
    this._collection = collection;
    this._collection.forEach((file)=>{
      if(file instanceof FileImageModel){
        file.loadPreview()
      }
    })
    /*
      newFile.loadImageMethod = ( file, callback )=>{
        // newFile.getImagePreview( file, ( err: any, img: ImageModel )=>{
        //   newFile.image = img;
        //   if(callback) callback(null, img);
        // }, newFile.key );
      };
    */
  }
  get collection(){
    return this._collection;
  }



  public _styles: string = "ng-thumb";
  @Input()
  set styles(styles: string){
    this._styles += " " + styles;
  }

  removeFile(file: FileModel){

    this.removeChange.emit(file);

    // this.collection.remove(file)
    // this.collectionChange.emit(this.collection)
  }
  @Output() collectionChange = new EventEmitter(true);
  @Output() removeChange = new EventEmitter(true);
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
    ;
    this._gallery = gallery;
    this._gallery.files.forEach((elem)=>{
      if( elem instanceof FileImage){
        elem.loadImage();
      }
      if(!elem.isUploaded){
        elem.callbackProgress = (progress)=>{
          ;
        };
        elem.callbackAfter = (err, res)=>{
          ;
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
    //;
  }

  @Output() removeEvent = new EventEmitter<any>();
  removeFile(file: FileModel){

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

  openGallery(index) {
    console.log(index);
    // this.gallery.index = index;
    let files = this._collection.filterType<FileImageModel>()
    let gallery = new ImageGalleryModel(files, this.circularGallery )
    this.imageGalleryService.setImages(gallery)
    // this.opened = true;
    // for (var i = 0; i < this.gallery.images.length; i++) {
    //   if (i === this.currentImageIndex ) {
    //     this.imgSrc = this.gallery.images[i].str;
    //     this.loading = false;
    //     break;
    //   }
    // }
  }
}
