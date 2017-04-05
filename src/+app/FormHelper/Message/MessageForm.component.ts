import { Component, Output, EventEmitter, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
// import { ImageGalleryModel } from '../image-galery/ImageGallery.model';
// import { FileImage } from '../form-elements/FileImage.model';
// import { ImageModel } from '../imgb/imgb.model';
// import { FileUploadButton } from './file-upload-button.component';
// import { FilesGalleryModel } from '../image-galery/FilesGallery.model';

import { FileCollection } from '../../Collection';
import { FileUploadButton } from '../../FileUploader/FileUploaderButton';
import { FileModel } from '../../Files/models'

import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'message-form',
  styles: [`
    :host {
      position: relative;
    }

    .file-upload-button {
      position: absolute;
      margin: 12px 15px;
      overflow: hidden;
      line-height: 2em;
      display: inline-flex;
      right: 0;
    }



    #hiddenDivTextarea {
      z-index: 1;
      opacity: 0;
      position: absolute;
      background: red;
      word-wrap: break-word;
    }

    #description {
      z-index: 2;
      position: relative;
      height: 56px;
    }

    .file-upload-button {
      z-index: 3;
    }

    .mytextarea {
      padding: 10px 20px;
      resize: none;
      overflow: hidden;
      padding-right: 47px;
      background: #fff;
      margin-top: 0px;
      padding-left: 20px;
      font-size: 1em;
      border-radius: 3px;
      color: #585d6c;
      width: 100%;
      border: 1px solid #eceff3;
    }

    .clip-icon {
      position: relative;
      top: 0;
      vertical-align: top;
      padding-top: 10px;
    }

    .message-gallery {
      margin-top: 10px;
    }
  `],
  template: `
      <!-- User -->
      <!--  name="text", placeholder="Message", type="text", formControlName="text", id="text"  -->

      <!-- [collection]="_collection" [maxCount]="10" -->
      <file-upload-button [(collection)]="_collection" #fileUploadButton [maxCount]="10" class="file-upload-button">
        <img src="assets/photo-clip.svg"/>
      </file-upload-button>

      <limit-input
        (ngModelChange)="onChange($event)"
        [ngModel]="inputValue"
        [label]="label"
        [limit]="limit"
        [shorten]="shorten"
        [showLimit]="inputValue.length / limit > .8">
      </limit-input>

      <div class="message-gallery"  *ngIf="_collection.length > 0">
        <img src="assets/clip.svg" *ngIf="_collection.length > 0" class="clip-icon"/>
        <cn-collection [(collection)]="_collection" [editable]="editableImage" (removeChange)="removeChange($event)"></cn-collection>
        <!-- ImageSmallGallery [stylesmain]="styles" [(gallery)]="_fileGallery" editable="{{ true }}" *ngIf="fileGallery._files.length > 0">
        </ImageSmallGallery -->
      </div>
  `,
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MessageForm),
    multi: true,
  }
  ]
})

export class MessageForm implements ControlValueAccessor {

  @ViewChild('fileUploadButton') fileUploadButton: FileUploadButton;

  private propagateChange = (_: any) => {};
  public writeValue(obj: string) {
    if (obj) {
      this.inputValue = obj;
    }
  }
  public registerOnChange(fn: any) {
      this.propagateChange = fn;
  }
  public registerOnTouched() {}

  onChange( str: string ){
    this.inputValue = str;
    this.propagateChange(this.inputValue);
  }

  private styles: string = "my-thumbnail";
  @Input() editableImage: boolean = true;
  @Input() label: string;
  @Input() inputValue: string = '';
  @Input() limit: number = 240;
  @Input() shorten: boolean = true;
  @Input() use: number = 0;

  getData(data: any, isValid: boolean){

  }
  // @Output() filesGalleryChanges = new EventEmitter();

  // @ViewChild('fileUploadButton') fileUploadButton: FileUploadButton;
  // private _fileGallery: FilesGalleryModel = new FilesGalleryModel();
  // get fileGallery(){
  //   return this._fileGallery;
  // }
  // fileGalleryChange(fileGallery: FilesGalleryModel){
  //   this._fileGallery = fileGallery;
  //   this._fileGallery.files.forEach((elem)=>{
  //     if( elem instanceof FileImage && !elem.image && elem.isImage){
  //       elem.loadImage();
  //     }
  //   });
  //   this.filesGalleryChanges.emit(this._fileGallery);
  // }

  constructor(private elementRef: ElementRef) {
    // this._gallery = new ImageGalleryModel();
  }




  // private files: FileImage[] =[];
  // @Output() changeFiles = new EventEmitter();

  // private uploadMethod: any;



  // private resetFiles: any;

  // @Input()
  // set resetAll(reset: any){
  //   if(reset){
  //
  //     this.resetFiles = ()=>{
  //       this.files = [];
  //       this.gallery = new ImageGalleryModel();
  //       reset();
  //     };
  //     this.inputValue = "";
  //   }
  // }

  // private _gallery: ImageGalleryModel;

  // @Input()
  // set gallery(gallery: ImageGalleryModel){
  //   if(gallery != null) this._gallery = gallery;
  //
  // }
  // get gallery(){
  //   return this._gallery;
  // }

  // removeImage(image: ImageModel){
  //   let index = -1;
  //   for(let i=0;i<this.files.length;i++){
  //     if(this.files[i].key==image.fileName){
  //       index = i;
  //       break;
  //     }
  //   }
  //   if(index >= 0) this.files.splice(index,1);
  // }


  // changesFiles( data: any ){
  //   if(!gallery) return;
  //   this._gallery = gallery;
  // }

  // private _uploadFiles: boolean = false;
  // @Input()
  // set uploadFiles(obj: any){
  //   if(!obj || !obj.callback) return;
  //   let callback = obj.callback;
  //   let uploadCallback = obj.uploadCallback || function(){};
  //   if(callback){

  //     this.uploadMethod = {
  //       callback: (err, res)=>{
  //         if(!err){
  //           this._uploadFiles = true;
  //
  //           //this.isUpload.emit(true);
  //           callback(null, res);
  //         }
  //         else { console.error(err); callback(err, null); }
  //       },
  //       uploadCallback: (err,res)=>{
  //         if(!err){
  //
  //           this._uploadFiles = true;
  //           //this.isUpload.emit(true);
  //           uploadCallback(null, res);
  //         }
  //         else { console.error(err); uploadCallback(err, null); }
  //       }
  //     }

  //   }
  // }

  // uploadFilesVoid(){
  //
  // }

  // @Output() isUpload = new EventEmitter(true);




  // @ViewChild('filesUploadComponent') filesUploadComponent: FilesUploadBaseComponent;
  @Input() maxCount: number = Infinity;
  @Input() ext: Array<string>;

  private _collection: FileCollection<FileModel> = new FileCollection<FileModel>();
  @Input()
  get collection() {
    return this._collection;
  }

  @Output() collectionChange = new EventEmitter();

  set collection(collection: FileCollection<FileModel>) {
    if(collection){
      this._collection = this.setArrayCollection(new FileCollection<FileModel>(), collection);
      this.collectionChange.emit(this._collection);
      //if( !this.isCanUndo ) {
        //this.oldState = this.setArrayCollection(new FileCollection<FileModel>(), collection);
      //}
    }
  }


  private oldState: FileCollection<FileModel> = null;

  removeChange(file: FileModel){
    if(this.collection){
      if(!this.fileUploadButton) return;
      this.collection.remove(file);
      //this.collection = this.collection;
      this.fileUploadButton.resetFiles();
    }
  }

  resetFiles(){
    // if(this.collection){
    //   if(!this.filesUploadComponent) return;
    //   if(this.oldState) this.isCanUndo = true;
    //   this.oldState = this.setArrayCollection(new FileCollection<FileModel>(), this.collection);
    //   this.collection.splice(0, this.collection.length);
    //   this.onChange({ value: this.collection, isChanged: true })
    //   this.filesUploadComponent.resetFiles();
    // }
  }

  filesChange(files: FileModel[]){
    // if(this.collection){
    //   this.onChange({ value: this.setArrayCollection(this.collection, files), isChanged: true })
    // }
  }

  setArrayCollection(collection, files: FileModel[]){
    if(collection){
      collection.splice(0, collection.length);
      files.forEach((elem)=>{
        if(collection.length < this.maxCount) collection.push(elem);
      })
    }
    return collection;
  }

  undoRemoveFile(){
    // this.isCanUndo = false;
    // let collection = this.setArrayCollection(this.collection, this.oldState);
    // this.onChange({ value: collection, isChanged: true })
  }

}
