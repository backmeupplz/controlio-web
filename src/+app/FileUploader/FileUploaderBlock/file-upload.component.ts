import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FileCollection } from '../../Collection';
import { FileModel } from '../../Files/models';
import { FilesUploadBaseComponent } from '../FileUploaderBase';


@Component({
  styles: [
  `
  .remove {
    height: 100%;
  }

/*
  :host .file_block mh-button {
    padding: 0 15px;
  }
*/
  .file_block {
    width: 100%;
    padding: 6px 0;
  }

  .file_block__collection {
    display: inline-flex;
  }

  .hidden {
    display: none;
  }
  `
  ],
  selector: 'file-upload',
  template: `
  <div class="file_block" block="file_block">
    <div class="padding-common collection" elem="collection" *ngIf="collection.length > 0">
      <!--ImageSmallGallery [gallery]="gallery"></ImageSmallGallery-->
      <cn-collection [collection]="_collection"></cn-collection>
      <div  (click)="resetFiles()" class="remove">
        <svg-icon src="assets/delete.svg" block="mh-svg" mod="common awesome"></svg-icon>
        <p>Delete</p>
      </div>
    </div>

    <mh-button (click)="undoRemoveFile()" *ngIf="isCanUndo"
      title="Undo"
      mods="big padding painted radius"
      image-mods="separator-between reverse painted"
      text-mods="painted">
        <bts-icon icon="share-alt"></bts-icon>
    </mh-button>

    <label class="file_upload padding-common row jc-sb" [ngClass]="{hidden: collection.length >= maxCount }">
      <mh-button
        title="Choose"
        mods="big padding-big default radius margin"
        text-mods="default">
      </mh-button>
      <p class="padding-common" *ngIf="_collection.length <= 0">File not selected</p>
      <files-upload-base #filesUploadComponent [exts]="ext" [max]="maxCount" (filesChange)="filesChange($event)"></files-upload-base>
    </label>
  </div>`
})
export class FileUploaderButton {

  @ViewChild('filesUploadComponent') filesUploadComponent: FilesUploadBaseComponent;
  @Input() maxCount: number = Infinity;
  @Input() ext: Array<string>;

  private _collection: FileCollection<FileModel> = null;
  @Input()
  get collection() {
    return this._collection;
  }

  @Output() collectionChange = new EventEmitter();

  set collection(collection: FileCollection<FileModel>) {
    if(collection){
      this._collection = this.setArrayCollection(new FileCollection<FileModel>(), collection);
      this.collectionChange.emit(this._collection);
      if( !this.isCanUndo ) {
        this.oldState = this.setArrayCollection(new FileCollection<FileModel>(), collection);
      }
    }
  }


  private oldState: FileCollection<FileModel> = null;
  private isCanUndo: boolean = false;

  constructor() {}

  resetFiles(){
    if(this.collection){
      if(!this.filesUploadComponent) return;
      this.oldState = this.setArrayCollection(new FileCollection<FileModel>(), this.collection);
      this.collection.splice(0, this.collection.length);
      this.collectionChange.emit(this.collection);
      this.filesUploadComponent.resetFiles();
      this.isCanUndo = true;
    }
  }

  filesChange(files: FileModel[]){
    if(this.collection){
      this.collection = this.setArrayCollection(this.collection, files);
      this.collectionChange.emit(this.collection);
    }
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
    this.isCanUndo = false;
    this.collection = this.setArrayCollection(this.collection, this.oldState);
    this.collectionChange.emit(this.collection);
  }

}
