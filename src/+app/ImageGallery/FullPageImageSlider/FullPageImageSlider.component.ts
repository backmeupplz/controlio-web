import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ImageGalleryModel } from './ImageGallery.model';
import { ImageElementModel } from './ImageElement.model';
//import { AbstractElementModel } from '../models';

@Component({
  selector: 'fullPageImageSlider',
  template: require('./FullPageImageSlider.component.pug')
})
export class FullPageImageSlider implements OnInit {

  protected styles: string = "img-border-width";
  @Input('opened') opened: boolean = false;
  protected image: ImageElementModel;
  protected loading: boolean = false;
  protected showRepeat: boolean = false;

  @Input('gallery') public gallery: ImageGalleryModel;
  @Output('cancelEvent') cancelEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.loading = true;
    if(this.gallery.index >= 0) {
      this.showRepeat = false;
      this.openGallery(this.gallery.index);
    } else {
      this.showRepeat = true;
    }
  }
  closeGallery() {
    this.opened = false;
    this.cancelEvent.emit(null);
  }
  prevImage() {
    this.loading = true;
    this.image = this.gallery.getPrevElement();
  }
  nextImage() {
    this.loading = true;
    this.image = this.gallery.getNextElement();
  }
  openGallery(index?: number) {
    if( !index ) index = 0;
    this.loading = false;
  }
}
