import { Component, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { ImageGalleryModel } from '../image-galery/ImageGallery.model';
import { FileImage } from '../form-elements/FileImage.model';
import { ImageModel } from '../imgb/imgb.model';

@Component({
  selector: 'message-form',
  styles: [`
    :host {
      position: relative;
    }

    .file-upload-button {
      position: absolute;
      margin: 12px 15px;
      overflow: hidden;
      line-height: 2em;
      display: inline-flex;
      right: 0;
    }



    #hiddenDivTextarea {
      z-index: 1;
      opacity: 0;
      position: absolute;
      background: red;
      word-wrap: break-word;
    }

    #description {
      z-index: 2;
      position: relative;
      height: 56px;
    }

    .file-upload-button {
      z-index: 3;
    }

    .mytextarea {
      padding: 10px 20px;
      resize: none;
      overflow: hidden;
      padding-right: 47px;
      background: #fff;
      margin-top: 0px;
      padding-left: 20px;
      font-size: 1em;
      border-radius: 3px;
      color: #585d6c;
      width: 100%;
      border: 1px solid #eceff3;
    }

    .clip-icon {
      position: relative;
      top: 0;
      vertical-align: top;
      padding-top: 10px;
    }

    .message-gallery {
      margin-top: 10px;
    }
  `],
  template: `

    <!-- User -->
    <!--  name="text", placeholder="Message", type="text", formControlName="text", id="text"  -->
    <file-upload-button class="file-upload-button" [upload]="uploadMethod" (valueChange)="changesFiles($event)" [maxCount]="10" [refreshFiles]="files" [resetFiles]="resetFiles">
      <img src="assets/photo-clip.svg"/>
    </file-upload-button>

    <div class="mytextarea" id="hiddenDivTextarea">{{ inputValue }}</div>
		<textarea
		type="text"
		class="mytextarea"
    placeholder="Message"
    id="description"
		[(ngModel)]="inputValue"
		name="inputValue"
		(paste)="inputPaste($event)"
		(keydown)="inputChanged($event)"
		(blur)="inputBlurred($event)"
		ngDefaultControl row="3"></textarea>
    <div class="message-gallery">
      <img src="assets/clip.svg" *ngIf="gallery._images.length> 0" class="clip-icon"/>
      <ImageSmallGallery [stylesmain]="styles" [gallery]="gallery" (removeEvent)="removeImage($event)" editable="{{ true }}" *ngIf="gallery._images.length > 0">
      </ImageSmallGallery>
    </div>
  `,
})

export class MessageForm {
  componentName: "MessageForm";
  private styles: string = "my-thumbnail";
  public inputValue: string = '';
  public limit: number = Infinity;
  public use: number = 0;
  private paddingTextarea: number[] = [10,10];

  private files: FileImage[] =[];
  @Output() changeFiles = new EventEmitter();

  private uploadMethod: any;



  private resetFiles: any;

  @Input()
  set resetAll(reset: any){
    if(reset){
      this.resetFiles = ()=>{
        this.files = [];
        this.gallery = new ImageGalleryModel();
        reset();
      };
      this.inputValue = "";
    }
  }

  private _gallery: ImageGalleryModel;

  @Input()
  set gallery(gallery: ImageGalleryModel){
    if(gallery != null) this._gallery = gallery;
    console.log(this.gallery);
  }
  get gallery(){
    return this._gallery;
  }

  removeImage(image: ImageModel){
    let index = -1;
    for(let i=0;i<this.files.length;i++){
      if(this.files[i].key==image.fileName){
        index = i;
        break;
      }
    }
    if(index >= 0) this.files.splice(index,1);
  }

  changesFiles( data: any ){
    if(data){
      let files = data.files;
      let newFiles = data.newFiles;
      newFiles.forEach((elem)=>{
        elem.loadImage((err, img)=>{
          this._gallery.addImage(img);
        });
      })
      this.files = this.files.concat(newFiles)
      this.changeFiles.emit(this.files)
    }
  }

  private _uploadFiles: boolean = false;
  @Input()
  set uploadFiles(callback: any){
    if(callback){
      console.log("Upload files");
      this.uploadMethod = (err, res)=>{
        if(!err){
          console.log(res)
          this._uploadFiles = true;
          //this.isUpload.emit(true);
          callback(null, res);
        }
        else { console.error(err); callback(err, null); }
      }
    }
  }

  @Output() isUpload = new EventEmitter(true);

  @Input() label: string;

  @Output() inputChange = new EventEmitter();

  @Input()
  set value( str: string ){
    if( str ) this.onChange( str );
  }

  onChange( str: string ){
  	this.inputValue = str.slice( 0, this.limit );
    this.inputChange.emit( this.inputValue );
  	this.use = this.inputValue.length;
    this.adjustHeight( this.elementRef.nativeElement );
  }

  public adjustHeight(textarea){

    let minHeight = 46;
    let addDown = 10;
    let childs = textarea.children;
    if( childs.description ){
      let clild = childs.description;
      let hiddenDiv = childs.hiddenDivTextarea;

      clild.style.height = (((hiddenDiv.clientHeight) > minHeight ? hiddenDiv.clientHeight: minHeight ) + addDown ) + "px";
    }
  }
  constructor(private elementRef: ElementRef) {
    this._gallery = new ImageGalleryModel();
  }
  inputChanged(event) {
    this.onChange( this.inputValue );
  }

  inputBlurred(event) {
  	this.onChange( this.inputValue );
  }

  inputPaste(event) {
  	this.onChange( this.inputValue );
  }
}
