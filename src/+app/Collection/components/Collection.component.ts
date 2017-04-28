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
        <div *ngIf="!isImage(file)" class="file-title">
          <p class="file-name">{{ file.shortName }}</p>
          <p class="file-type">{{ file.type }}</p>
        </div>
        <file-image *ngIf="isImage(file)" [file]="file" (click)="openGallery(file)"></file-image>
        <!--cn-img *ngIf="file.preview" [image]="file.preview" class="photo-mini" styles="ng-thumb"></cn-img-->
        <span class="remove-icon glyphicon glyphicon-remove" aria-hidden="true" (click)="removeFile(file)" *ngIf="editable && !file.isLoad"></span>
      </div>
   </div>
       `
})
export class CollectionComponent {

  constructor(private imageGalleryService: ImageGalleryService, private circularGallery: CircularGallery<FileModel>) {}
  @Input() canOpenGallery: boolean = true;
  @Input() editable: boolean = true;
  private _collection: FileCollection<FileModel>;
  @Input('collection')
  set collection(collection: FileCollection<FileModel>){
    console.log(collection);
    this._collection = collection;
  }
  get collection(){
    return this._collection;
  }

  isImage(file: FileModel){
    if(file instanceof FileImageModel){
      return true;
    } else {
      return false;
    }
  }

  public _styles: string = "ng-thumb";
  @Input()
  set styles(styles: string){
    this._styles += " " + styles;
  }

  removeFile(file: FileModel){
    this.removeChange.emit(file);
  }
  @Output() collectionChange = new EventEmitter(true);
  @Output() removeChange = new EventEmitter(true);

  openGallery(file: FileModel) {
    if(file && !file.isError && this.canOpenGallery && !file.isLoad ){
      let files = this._collection.filterType<FileImageModel>()
      let gallery = new ImageGalleryModel(files, this.circularGallery )
      if( file instanceof FileImageModel) this.imageGalleryService.setImages(gallery, files.indexOf(file))
      else {
        this.imageGalleryService.setImages(gallery)
      }
    }
  }
}
