import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FileUploadService } from '../services';
// import { ImageModel } from '../imgb/imgb.model';
// import { ImageGalleryModel } from '../image-galery/ImageGallery.model';
// import { FilesGalleryModel } from '../image-galery/FilesGallery.model';
// import { FileImage } from './FileImage.model';
import { FileModel } from '../../Files/models';
import { FilesUploadBaseComponent } from '../FileUploaderBase';

@Component({
  styles: [`
  .my-input {
    height: auto;
  }
  `],
  selector: 'file-upload-button',
  template: `
   <div class="file_block">
     <label class="file_upload">
      <ng-content></ng-content>
      <files-upload #filesUploadComponent [exts]="ext" [max]="maxCount" (addedFiles)="addedFiles($event)"></files-upload>
     </label>
   </div>`
})

export class FileUploadButton {

  @ViewChild(FilesUploadBaseComponent) filesUploadComponent: FilesUploadBaseComponent;

  @Input() maxCount: number = 1;
  @Input() ext: Array<string>;

  @Output() fileGalleryChange = new EventEmitter();

  private loadImages: boolean = false;
  get files(){
    if(!this.filesUploadComponent) return null;
    return this.filesUploadComponent.files;
  }

  // private _fileGallery: FilesGalleryModel;

  // @Input()
  // set fileGallery(fileGallery: FilesGalleryModel){
  //   console.log("fileGallery", fileGallery)
  //   this._fileGallery = fileGallery;
  //   this.fileGalleryChange.emit(fileGallery);
  // }
  // get fileGallery(){
  //   return this._fileGallery;
  // }
  // @Input()
  // set upload(obj:any){
  //   if(!obj || !obj.callback) return;
  //   let callback = obj.callback;
  //   let uploadCallback = obj.uploadCallback || function(){};
  //   let count = this._files.length;
  //   let pull = [];
  //   let uploadPull = [];
  //   if( callback != undefined && this._files.length > 0 ){
  //     this._files.forEach((file: any)=>{
  //       this.fileUploadService.uploadOn( file.key, file.file, (err, data)=>{
  //         console.log("callback FileUploadButton", new Date())
  //         if(!err) pull.push({ res: data, key: file.key });
  //         else pull.push({ file: file, err: err });
  //         if(count == pull.length){
  //           callback(null, pull);
  //         }
  //       }, (_file: any, progress: any)=>{
  //         if(progress == 100){
  //           uploadPull.push({ key: file.key });
  //           if(count == uploadPull.length){
  //             console.log("uploadCallback FileUploadButton", new Date())
  //             uploadCallback(null, uploadPull);
  //           }
  //         }
  //       })
  //     })
  //   } else if( callback != undefined && this._files.length <= 0) {
  //     uploadCallback(null, uploadPull);
  //     callback(null, pull);
  //   }
  // }

  constructor(private fileUploadService: FileUploadService) {}

  resetFiles(){
    this.filesUploadComponent.resetFiles();
  }

  removeFileFromKey(key: string){
    this.filesUploadComponent.removeFileFormKey(key);
  }

  addedFiles(files: FileModel[]){
    // if(!this.fileGallery) return;
    // files.forEach((file: FileModel)=>{
    //   this.fileGallery.addfile(file);
    // })
    // this.fileGalleryChange.emit(this.fileGallery);
  }
}
