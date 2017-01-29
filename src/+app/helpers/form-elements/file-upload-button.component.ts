import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { BucketService } from '../../bucket/bucket.service';
import { FileUploadService } from './FileUploadService.service';
import { ImageModel } from '../imgb/imgb.model';
import { ImageGalleryModel } from '../image-galery/ImageGallery.model';
import { FileImage } from './FileImage.model';

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
      <input type="file" #myInput class="my-input" (change)="fileEvent($event)" accept="{{ _exts }}" multiple/>
     </label>
   </div>`
})

export class FileUploadButton {
	componentName: "FileUploadButton";

	private _files: FileImage[] = [];
  private _exts: string;
  @ViewChild('myInput')
  myInputVariable: any;

  @Input() maxCount: number = 1;
  private loadImages: boolean = false;

  @Output() valueChange = new EventEmitter();
  @Input() ext: Array<string>;

  @Input()
  set resetFiles(reset: any){
    if(reset){
      this.doResetFiles();
      reset();
    }
  }

  @Input()
  set refreshFiles(files: FileImage[]){
    this.doResetFiles();
    this._files = files;
  }

  doResetFiles(){
    this.myInputVariable.nativeElement.value = "";
  }


  findFile(name: string, group?: any) {
    if(!group) group = this.myInputVariable.nativeElement.files;
    let index = -1;
    for(let i=0;i< group.length;i++){
      let file = group[i];
      if( file.name == name ) index = i;
    }
    return index;
  }

  @Input()
  set upload(callback:any){
    let count = this._files.length;
    let pull = [];
    if( callback != undefined && this._files.length > 0 ){
      this._files.forEach((file: any)=>{
        this.fileUploadService.uploadOn( file.key, file.file, (err, data)=>{
          if(!err) pull.push({ res: data, key: file.key });
          else pull.push({ file: file, err: err });
          if(count == pull.length){
            callback(null, pull);
          }
        });
      })
    } else if( callback != undefined && this._files.length <= 0) {
    	callback(null, pull);
    }
  }

  constructor(private bucket: BucketService, private fileUploadService: FileUploadService) {
    this.fileUploadService.ext = ["image/jpeg","image/png"];
    this._exts = this.fileUploadService.ext.join(",");
  }

  fileEvent(fileInput: any){

    //console.log(fileInput.target.files)
    if( fileInput.target.files.length > 0 && fileInput.target.files.length <= this.maxCount ){


      let files = [];
      for(let i=0;i<fileInput.target.files.length;i++){
        files.push(fileInput.target.files[i])
      }
      const self = this;

      let newFiles = files.filter((curFile)=>{
        if(!this._files.find((saveFile)=>{ return curFile.name == saveFile.file.name;})){
          return curFile;
        }
      }).map((file: any)=>{
        let newFile = this.fileUploadService.createImageFile(file);
        return newFile;
      });

      this._files = this._files.concat(newFiles);

      if(this._files.length > 0) this.valueChange.emit({ files: this._files, newFiles: newFiles})

    }
  }
}
