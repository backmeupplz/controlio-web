import { Component, Output, EventEmitter, Input, ViewChild, forwardRef } from '@angular/core';
import { FileCollection } from '../../Collection';
import { FileModel } from '../../Files/models';
import { FilesUploadBaseComponent } from '../FileUploaderBase';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
  .remove p {
    white-space: nowrap;
  }

  .remove svg-icon {
    min-width: 13px;
  }
  `
  ],
  selector: 'file-upload',
  template: `
  <div class="file_block" block="file_block" *ngIf="collection">
    <div class="padding-common-right collection" elem="collection" *ngIf="(collection) ? collection.length > 0 : false">
      <!--ImageSmallGallery [gallery]="gallery"></ImageSmallGallery-->
      <cn-collection [(collection)]="_collection" [editable]="editable" (removeChange)="removeChange($event)"></cn-collection>
      <div  (click)="resetFiles()" class="remove">
        <svg-icon src="assets/delete.svg" block="mh-svg" mod="common awesome"></svg-icon>
        <p>{{ _collection.length > 1 ? 'Delete all' : 'Delete' }}</p>
      </div>
    </div>

    <mh-button (click)="undoRemoveFile()" *ngIf="isCanUndo"
      style="align-self: center; margin-right: 15px;"
      title="Undo"
      mods="big padding painted radius"
      image-mods="separator-between reverse painted"
      text-mods="painted">
        <bts-icon icon="share-alt"></bts-icon>
    </mh-button>

    <label class="file_upload padding-common row jc-sb" [ngClass]="{hidden: (collection) ? collection.length >= maxCount : false }">
      <mh-button
        style="align-self: center"
        title="Choose"
        mods="big padding-big default radius margin"
        text-mods="default">
      </mh-button>
      <p class="padding-common" *ngIf="_collection.length <= 0">File not selected</p>
      <files-upload-base #filesUploadComponent [exts]="ext" [max]="maxCount" (filesChange)="filesChange($event)"></files-upload-base>
    </label>
  </div>`,
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileUploaderButton),
    multi: true,
  }
  ]
})
export class FileUploaderButton {
  private editable: boolean = true;
  private propagateChange = (_: any) => {};
  public writeValue(value: FileCollection<FileModel>) {
    console.log(value)
    this.collection = value;
  }
  public registerOnChange(fn: any) {
      this.propagateChange = fn;
  }
  public registerOnTouched() {}

  onChange( value: { value: FileCollection<FileModel>, isChanged: boolean } ){
    console.log(value)
    if( value.isChanged ){
      this.collection = value.value;
      this.propagateChange(this.collection);
    }
  }


  @ViewChild('filesUploadComponent') filesUploadComponent: FilesUploadBaseComponent;
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
      if( !this.isCanUndo ) {
        this.oldState = this.setArrayCollection(new FileCollection<FileModel>(), collection);
      }
    }
  }


  private oldState: FileCollection<FileModel> = null;
  private isCanUndo: boolean = false;

  constructor() {}

  removeChange(file: FileModel){
    if(this.collection){
      if(!this.filesUploadComponent) return;
      this.collection.remove(file);
      this.onChange({ value: this.collection, isChanged: true })
      this.filesUploadComponent.resetFiles();
    }
  }

  resetFiles(){
    if(this.collection){
      if(!this.filesUploadComponent) return;
      if(this.oldState) this.isCanUndo = true;
      this.oldState = this.setArrayCollection(new FileCollection<FileModel>(), this.collection);
      this.collection.splice(0, this.collection.length);
      this.onChange({ value: this.collection, isChanged: true })
      this.filesUploadComponent.resetFiles();
    }
  }

  filesChange(files: FileModel[]){
    if(this.collection){
      this.onChange({ value: this.setArrayCollection(this.collection, files), isChanged: true })
    }
  }

  setArrayCollection(collection, files: FileModel[]){
    if(collection){
      collection = collection.filter((elem)=>{
        return elem.isUploaded;
      })
      files.forEach((elem)=>{
        if(collection.length < this.maxCount) collection.push(elem);
      })
    }
    return collection;
  }

  undoRemoveFile(){
    this.isCanUndo = false;
    let collection = this.setArrayCollection(this.collection, this.oldState);
    this.onChange({ value: collection, isChanged: true })
  }

}
