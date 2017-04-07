import { Component, OnInit, Input } from '@angular/core';
import { AbstractImageModel } from '../AbstractImage.model';
import { ImageService } from '../services';

@Component({
  selector: 'cn-img-key',
  template: require('./ImageKey.component.pug')
})
export class ImageKeyComponent implements OnInit {

  private _image: AbstractImageModel;
  @Input()
  set image(image: AbstractImageModel){
    if(!this._key) this._image = image;
  }
  get image(){
    return this._image;
  }

  private _key: string;
  @Input()
  set key(key: string){
    this._key = key;
    let cachedImg = this.imageService.getCachedImg(key);
    if(cachedImg != null){
      this._image = cachedImg;
      return;
    }
    if(this.key){
      this.imageService.downloadImage(this._key).subscribe((image)=>{
        this._image = image;
      })
    }
  }
  get key(){
    return this._key;
  }

  constructor(private imageService: ImageService) {}
  ngOnInit() {}
}
