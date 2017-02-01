import { Component, Output, EventEmitter, Input } from '@angular/core';
import { BucketService } from '../../bucket/bucket.service';
import { FileUploadService } from './FileUploadService.service';
import { ImageModel } from '../imgb/imgb.model';
import { ImageGalleryModel } from '../image-galery/ImageGallery.model';

//import { FileUploader } from 'ng2-file-upload';



@Component({
  styles: [
  `
  /*
  .file_block , .undo {
    height: 3.5em;
  }*/

  .remove {
    height: 100%;
  }

  :host .file_block mh-button {
    padding: 0 15px;
  }
  `
  ],
  selector: 'file-upload',
  template: `
   <div class="file_block in-flex">
     <div class="author padding-common"  *ngIf="useOld || file">
      <ImageSmallGallery [gallery]="gallery"></ImageSmallGallery>
      <div  (click)="removeFile()" class="remove"><svg-icon src="assets/delete.svg" block="mh-svg" mod="common awesome"></svg-icon><p>Delete</p></div>
     </div>

      <mh-button (click)="undoRemoveFile()" *ngIf="!useOld && !file && _imageLastPreview"
        title="Undo"
        mods="big padding painted radius margin"
        image-mods="separator-between reverse painted"
        text-mods="painted">
          <bts-icon icon="share-alt"></bts-icon>
      </mh-button>

     <label class="file_upload padding-common row" *ngIf="!useOld && !file">
      <mh-button
        title="Choose"
        mods="big padding-big default radius margin"
        text-mods="default">
      </mh-button>
      <p class="padding-common">File not selected</p>
      <input type="file" (change)="fileEvent($event)" accept="{{ _exts }}"/>
     </label>
   </div>`
})

export class ImportFileElement {
	componentName: "ImportFileElement";
	private file: any;
	private key: string;
  private file_key: string;
  private _exts: string;

  private styles: string = "photo-mini";
  private _imageLastPreview: ImageModel;
  private imagePreview: ImageModel;
  private useOld: boolean = false;
  private gallery: ImageGalleryModel;


  @Output() valueChange = new EventEmitter();
  @Input() ext: Array<string>;
  @Input()
  set image( imageLast: ImageModel ){
    if( imageLast ){
      this._imageLastPreview = imageLast;
      if(!this.imagePreview){
        this.changePreview(this._imageLastPreview)
        this.useOld = true;
      }
    }
  }

  @Input()
  set upload(callback:any){
    if( callback != undefined && this.file_key.length > 0 && this.file != undefined ){
      console.log("start");
      this.fileUploadService.uploadOn(this.file_key, this.file, callback);
    }
  }


  constructor(private bucket: BucketService, private fileUploadService: FileUploadService) {
    this.fileUploadService.ext = ["image/jpeg","image/png"];
    this._exts = this.fileUploadService.ext.join(",");
    this.gallery = new ImageGalleryModel();
  }

  removeFile(){
    if( this.file ) this.file = null;
    this.file_key = "";
    this.valueChange.emit({ key: undefined  })
    console.log("remove file");
    this.useOld = false;
  }

  undoRemoveFile(){
    this.imagePreview = this._imageLastPreview;
    this.changePreview(this._imageLastPreview);
    this.useOld = true;
  }

  changePreview(image: ImageModel){
    this.gallery.setOneImage(image);
  }


  fileEvent(fileInput: any){
    if( fileInput.target.files.length > 0 ){

      this.file = fileInput.target.files[0];

      this.fileUploadService.getImagePreview(this.file, ( err: any, img: ImageModel )=>{
        this.imagePreview = img;
        this.changePreview(this.imagePreview)
      });

      this.file_key = this.fileUploadService.generateKey( this.file );

      if(this.file_key  !== null) this.valueChange.emit({ key: this.file_key  })

    } else {
      this.removeFile();
    }
  }
}
