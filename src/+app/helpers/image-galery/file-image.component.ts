import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FileImage } from '../form-elements/FileImage.model';
import { BucketService } from '../../bucket/bucket.service';
import { CircleProgressComponent } from '../progress-circle/circle-progress.component';
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
      background: #aaaaaa;/*#d5d5d5;*/
    }

    .js-onload /deep/ .ng-thumb {
      opacity: .7;
    }
  `],
  selector: 'file-image',
  templateUrl: `
  <div class="thumbnail" *ngIf="file" [ngClass]="{'js-onload': file.isLoad, 'js-isuploaded': file.isUploaded }">

     <imgb [image]="file.image" [styles]="_styles"></imgb>

     <div class="image-mask"><imgb [image]="file.image" [styles]="_styles" *ngIf="file.isLoad"></imgb></div>
     <div class="round-circle">
     <circle-progress #circle *ngIf="file.isLoad"
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
  constructor(private bucketService: BucketService, private ref: ChangeDetectorRef) {
    this.bucketService.progress$.subscribe(
    data => {
      // let file = this.gallery.findfileFromStr(data.key);
      // if(file){
        // file.progress = data.progress;
        if( data.key == this.file.key ){

          //this.progress = data.progress;
          this.file.progress = data.progress;
          this.ref.detectChanges();
          this.circle.start(data.progress);
          console.log("progress", data.key, data.progress);
        }
      // }
    });
  }
  @Input('file') file: FileImage;
  ngOnChange(value){
    console.log(value);
  }
  ngOnInit() { }
}
