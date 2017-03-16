import { Component, Output, EventEmitter, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
// import { ImageGalleryModel } from '../image-galery/ImageGallery.model';
// import { FileImage } from '../form-elements/FileImage.model';
// import { ImageModel } from '../imgb/imgb.model';
// import { FileUploadButton } from './file-upload-button.component';
// import { FilesGalleryModel } from '../image-galery/FilesGallery.model';


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


      <!-- file-upload-button #fileUploadButton class="file-upload-button" [fileGallery]="_fileGallery" (fileGalleryChange)="fileGalleryChange($event)" [maxCount]="10">
        <img src="assets/photo-clip.svg"/>
      </file-upload-button -->

      <limit-input
        (ngModelChange)="onChange($event)"
        [ngModel]="inputValue"
        label="Message"
        [limit]="limit"
        [shorten]="shorten">
      </limit-input>

      <!--div class="message-gallery">
        <img src="assets/clip.svg" *ngIf="fileGallery._files.length> 0" class="clip-icon"/>
        <ImageSmallGallery [stylesmain]="styles" [(gallery)]="_fileGallery" editable="{{ true }}" *ngIf="fileGallery._files.length > 0">
        </ImageSmallGallery>
      </div-->
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


  @Input() inputValue: string = '';
  @Input() limit: number = 240;
  @Input() shorten: boolean = true;
  @Input() use: number = 0;

  getData(data: any, isValid: boolean){
    console.log(data, isValid)
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
  //     console.log("reset MessageForm", new Date())
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
  //   console.log("set gallery MessageForm", new Date())
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
  //           console.log("callback MessageForm", new Date())
  //           //this.isUpload.emit(true);
  //           callback(null, res);
  //         }
  //         else { console.error(err); callback(err, null); }
  //       },
  //       uploadCallback: (err,res)=>{
  //         if(!err){
  //           console.log("uploadCallback MessageForm", new Date())
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
  //   console.log("uploadFilesVoid")
  // }

  // @Output() isUpload = new EventEmitter(true);

}
