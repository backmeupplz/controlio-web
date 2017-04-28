import { Component, OnInit, Input } from '@angular/core';
import { AbstractImageModel } from '../AbstractImage.model';
import { ImageService } from '../services';
import { AppConfig } from '../../app.config';

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
  @Input() capImage: string;
  private _image: AbstractImageModel;
  @Input()
  set image(image: AbstractImageModel){
    if(!this._key && image) this.src = image.src;
    //this._image = image;
  }
  get image(){
    return this._image;
  }

  private src: string;
  private _key: string;
  @Input()
  set key(key: string){
    this._key = key;
    if(key){
      this.imageService.downloadImage(key).subscribe((image)=>{
        this.src = image.src;
      })
    }
  }
  get key(){
    return this._key;
  }

  constructor(private imageService: ImageService) {}
  ngOnInit() {}
}
