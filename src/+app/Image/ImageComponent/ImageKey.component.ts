import { Component, OnInit, Input } from '@angular/core';
import { AbstractImageModel } from '../AbstractImage.model';
import { ImageService } from '../services';

@Component({
  selector: 'cn-img-key',
  templateUrl: 'ImageKey.component.html'
})
export class ImageKeyComponent implements OnInit {

  private _image: AbstractImageModel;
  @Input()
  set image(image: AbstractImageModel){
    this._image = image;
  }
  get image(){
    return this._image;
  }

  private _key: string;
  @Input()
  set key(key: string){
    this._key = key;
    this.imageService.downloadImage(this._key).subscribe((image)=>{
      this._image = image;
    })
  }
  get key(){
    return this._key;
  }

  constructor(private imageService: ImageService) {}
  ngOnInit() {}
}
