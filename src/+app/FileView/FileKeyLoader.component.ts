import { Component, OnInit, Input } from '@angular/core';
import { IFileLoader } from './IFileLoader.interface';
import { FileModel } from '../FileUploader/models';
import { FileService } from './File.service';

@Component({
  selector: 'cn-file',
  templateUrl: require('./File.component.pug')
})
export class FIleComponent implements OnInit {
  private file: FileModel;
  constructor(private fileService: FileService) {}

  @Input()
  set key(key: string){
    this.fileService.loadFile(key).subscribe((file: FileModel)=>{
      this.file = file;
    })
  }

  ngOnInit() {}
}
