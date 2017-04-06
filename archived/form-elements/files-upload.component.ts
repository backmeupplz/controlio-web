import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FileUploadService } from './FileUploadService.service';
import { FileModel } from './File.model';

@Component({
  selector: 'files-upload',
  template: '<input type="file" #myInput (change)="fileEvent($event)" accept="{{ _exts }}" multiple/>'
})
export class FilesUploadComponent {

  private _exts: string = "";
  @Input()
  set exts(strs: string[]){
    if(strs) this._exts = strs.join();
  }
  @Input('max') maxCount: number = 1;

  @Output() filesChange = new EventEmitter(true);
  @Output() addedFiles = new EventEmitter(true);
  @Output() removedFiles = new EventEmitter(true);

  @ViewChild('myInput')
  myInputVariable: any;

  private _files: FileModel[] = [];
  get files(){
    return this._files;
  }

  constructor(private fileUploadService: FileUploadService){}

  getFileFromName( files, name: string ){
    return files.find( (saveFile: FileModel | any)=>{
      return saveFile instanceof FileModel ? name == saveFile.file.name : saveFile.name;
    });
  }

  getFileFromKey( files, key: string ){
    return files.find( (saveFile: FileModel)=>{
      return key == saveFile.key;
    });
  }

  getFileTempFromName( name: string ){
    return this.getFileFromName(this._files, name);
  }

  getFileTempFromKey( key: string ){
    return this.getFileFromKey(this._files, name);
  }

  /*
  *  Remove file in temp array!
  */
  removeFileFormKey(key: string){
    let index = this.files.findIndex((file: FileModel)=>{
      return file.key == key;
    });
    if(index > -1) this.files.splice(index, 1);
    this.resetFiles();
  }

  /*
  *  Handle check files
  */
  fileEvent(fileInput: any){
    let fileInputFiles = fileInput.target.files;
    let temps = [];
    const self = this;

    for(let i=0;i< fileInputFiles.length;i++){
      temps.push(fileInputFiles[i])
    }

    if( temps.length > 0 && temps.length <= this.maxCount ){
      // find added files
      let addedFiles = temps.filter((curFile: any)=>{
        if(!this.getFileTempFromName( curFile.name )){ return curFile; }
      }).map((file: any)=> self.fileUploadService.createFile(file) );

      // find removed files
      let removedFiles = this._files.filter((curFile: FileModel)=>{
        if(this.getFileFromName( temps, curFile.file.name )){ return curFile; }
      });

      // get all files
      let newModels = temps.map((file: any)=> self.fileUploadService.createFile(file) );

      this._files = newModels;

      this.filesChange.emit( this._files )
      this.addedFiles.emit( addedFiles )
      this.removedFiles.emit( removedFiles )
    }
  }

  /*
  *  Recet file
  */
  resetFiles(){
    this.myInputVariable.nativeElement.value = "";
  }
}
