import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FileUploadService } from '../services';
// import { ImageModel } from '../imgb/imgb.model';
// import { ImageGalleryModel } from '../image-galery/ImageGallery.model';
// import { FilesGalleryModel } from '../image-galery/FilesGallery.model';
// import { FileImage } from './FileImage.model';
import { FileModel } from '../../Files/models';
import { FilesUploadBaseComponent } from '../FileUploaderBase';
import { FileCollection } from '../../Collection';

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
      <files-upload-base #filesUploadComponent [exts]="ext" [max]="maxCount" (filesChange)="filesChange($event)"></files-upload-base>
     </label>
   </div>`
})

export class FileUploadButton {

  @ViewChild(FilesUploadBaseComponent) filesUploadComponent: FilesUploadBaseComponent;
  @Input() maxCount: number = 1;
  @Input() ext: Array<string>;

  private _collection: FileCollection<FileModel> = new FileCollection<FileModel>();
  @Input()
  get collection() {
    return this._collection;
  }

  @Output() collectionChange = new EventEmitter();

  set collection(collection: FileCollection<FileModel>) {
    if(collection){
      this._collection = collection;
    }
  }

  // @Input()
  // set fileGallery(fileGallery: FilesGalleryModel){
  //
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
  //
  //         if(!err) pull.push({ res: data, key: file.key });
  //         else pull.push({ file: file, err: err });
  //         if(count == pull.length){
  //           callback(null, pull);
  //         }
  //       }, (_file: any, progress: any)=>{
  //         if(progress == 100){
  //           uploadPull.push({ key: file.key });
  //           if(count == uploadPull.length){
  //
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

  setArrayCollection(collection, files: FileModel[]){
    if(collection){
      files.forEach((elem)=>{
        if(collection.length < this.maxCount) collection.push(elem);
      })
    }
    return collection;
  }

  filesChange(files: FileModel[]){
    if(this.collection){
      let collection = this.collection.filter((elem)=>{
        return elem.isUploaded;
      })
      this.collection = this.setArrayCollection(collection, files)
      this.collectionChange.emit(this._collection);
    }
  }
}
