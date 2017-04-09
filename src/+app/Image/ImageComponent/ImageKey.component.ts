import { Component, OnInit, Input } from '@angular/core';
import { AbstractImageModel } from '../AbstractImage.model';
import { ImageService } from '../services';

@Component({
  styles: [`
    :host {
      display: flex;
      height: 100%;
    }
  `],
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
    if(key){
      this.imageService.downloadImage(key).subscribe((image)=>{
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
