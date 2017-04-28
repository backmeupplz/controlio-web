// import { Component, OnInit, Input } from '@angular/core';
// import { FileModel } from '../Files/models';
// import { FileService } from './File.service';

// @Component({
//   selector: 'cn-file',
//   templateUrl: require('./File.component.pug')
// })
// export class FIleComponent implements OnInit {
//   @Input() file: FileModel;
//   constructor(private fileService: FileService) {}
//   ngOnInit() {}
// }

import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FileImageModel } from '../Files/models';
import { BucketService } from '../bucket/bucket.service';
import { CircleProgressComponent } from './progress-circle/circle-progress.component';
import { ImageModel } from '../Image';
/*
<!-- div style="-webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);">
</div -->
*/
@Component({
  styles: [`
    .round-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 11;
    }

    .image-mask {
      -webkit-clip-path: circle(29% at 50% 50%);
      clip-path: circle(29% at 50% 50%);
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 12;
    }
    .js-onload {
      background: #ede8e8;/*#d5d5d5;*/
      opacity: .7;
    }

    .js-onload /deep/ .ng-thumb, .js-iserror /deep/ .ng-thumb{
      opacity: .5;
    }

    .js-iserror {
      background: red;
    }

    [hidden] {
      display: none !important;
    }

    cn-img-key {
      width: 100%;
    }

    .error-icon,  .reupload {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 2em;
      height: 2em;
    }

    .thumbnail:hover .error-icon {
      display: none;
    }

    .reupload {
      display: none;
    }

    .thumbnail:hover .reupload {
      display: block;
    }
  `],
  selector: 'file-image',
  templateUrl: `
  <div class="thumbnail" *ngIf="file" [ngClass]="{'js-onload': file.isLoad, 'js-isuploaded': file.isUploaded, 'js-iserror': isError }">

     <cn-img-key [image]="image" key="{{ (file.isUploaded) ? imageKey : null }}" style="position: absolute" class="{{ _styles }}"></cn-img-key>
     <svg-icon src="assets/error-triangle-w-clean.svg" block="mh-svg" mod="common" class="error-icon" *ngIf="isError"></svg-icon>
     <svg-icon src="assets/reload.svg" block="mh-svg" mod="common" class="reupload" *ngIf="isError && file.isCanReload" (click)="reloadAsset()"></svg-icon>

     <div class="image-mask" [hidden]="!file.isLoad || isError"><cn-img style="position: absolute" [image]="image" class="{{_styles}}"></cn-img></div>
     <div class="round-circle" [hidden]="!file.isLoad || isError">
     <circle-progress #circle
     [percent]="0"
     [boxSize]="46"
     [radius]="22"
     [color]="'#b0a4fd'"
     [border]="5"
     [time]="2"
     [textHidden]="true"
     ></circle-progress>
     </div>

  </div>
  `
})
export class FileImageComponent implements OnInit {
  @ViewChild('circle') circle: CircleProgressComponent;
  private progress: number = 0;
  public _styles: string = "ng-thumb";
  private sub: Subscription;
  constructor(private bucketService: BucketService, private ref: ChangeDetectorRef) {
    let self = this;
    this.sub = this.bucketService.progress$.subscribe(
    data => {
        if( data.key == self.file.key ){
          if(data.progress){
            self.file.progress = data.progress;
            self.ref.detectChanges();

            self.circle.start(data.progress);
          }
          if( data.error ){

            this.isError = true;
          }
        }
    });
  }
  private isError: boolean = false;
  private imageKey: string;
  private _file: FileImageModel;
  @Input('file')
  set file(file: FileImageModel){
    console.log(file);
    if(file instanceof FileImageModel){
      if(file.preview){
        this.image = file.preview;
      }
      else if(!file.isUploaded && file.file ){
        file.loadPreview((err, res)=>{
          this.image = file.preview;
        })
      } else if(file.isUploaded && !file.image){
        this.imageKey = file.key;
      } else {
        this.image = file.image;
      }
    }
    this._file = file;
  }
  get file(){
    return this._file;
  }
  @Input('image') image: ImageModel;
  reloadAsset(){
    this.file.uploadFile();
  }
  ngOnInit() { }
  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
