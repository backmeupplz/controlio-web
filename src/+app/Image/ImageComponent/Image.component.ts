import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AbstractImageModel } from '../AbstractImage.model';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  styles: [`
    :host img {
      height: 100%;
    }
    :host {
      height: 100%;
      width: 100%;
      display: flex;
      overflow: hidden;
      justify-content: center;
    }

    .load-img {
      max-width: 12em;
      max-height: 12em !important;
      display: flex;
      align-self: center;
      border: 1px solid #eaeaea;
      border-radius: 3px;
      background: #f8f8f8;
    }
  `],
  selector: 'cn-img',
  template: require('./image.component.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnInit {

  private _img: any;
  get img(){
    return this._img;
  }

  private _capImage: string = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i0KHQu9C+0LlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzOC4wNTZweCIgaGVpZ2h0PSIzNC4yNXB4IiB2aWV3Qm94PSItOS4zMDYgLTguMzc1IDM4LjA1NiAzNC4yNSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtOS4zMDYgLTguMzc1IDM4LjA1NiAzNC4yNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHRpdGxlPmNhbWVyYS1hbHQ8L3RpdGxlPjxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPjxnIGlkPSJwcm9qZWN0X2RldGFpbHNfbWFuYWdlciI+PGcgaWQ9InByb2plY3RfZGV0YWlsc19lZGl0X21lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05OTIuMDAwMDAwLCAtMjc0LjAwMDAwMCkiPjxnIGlkPSJtc2ctY29weS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NzAuMDAwMDAwLCAyMDIuMDAwMDAwKSI+PGcgaWQ9Im1lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLjAwMDAwMCwgNTQuMDAwMDAwKSI+PGcgaWQ9IkVNQUlMLV94MkJfLVJlY3RhbmdsZS02MzktX3gyQl8tWW91ci1lbWFpbC1Db3B5LTMiPjxnIGlkPSJjYW1lcmEtYWx0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MDIuMDAwMDAwLCAxOC4wMDAwMDApIj48Y2lyY2xlIGlkPSJPdmFsIiBmaWxsPSIjQTNBREJCIiBjeD0iMTAuMiIgY3k9IjEwLjIiIHI9IjMuMiIvPjxwYXRoIGlkPSJTaGFwZSIgZmlsbD0iI0EzQURCQiIgZD0iTTcsMEw1LjIsMkgyQzAuOSwyLDAsMi45LDAsNHYxMmMwLDEuMSwwLjksMiwyLDJoMTZjMS4xLDAsMi0wLjksMi0yVjRjMC0xLjEtMC45LTItMi0yaC0zLjJMMTMsMEg3TDcsMHogTTEwLDE1Yy0yLjgsMC01LTIuMi01LTVzMi4yLTUsNS01czUsMi4yLDUsNVMxMi44LDE1LDEwLDE1TDEwLDE1eiIvPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg=="
  @Input()
  set capImage(capImage: string){
    if(capImage) this._capImage = capImage;
  }
  get capImage(){
    return this._capImage;
  }
  get default(){
    return this.sanitizer.bypassSecurityTrustUrl(this.capImage);
  }


  private _image: AbstractImageModel = null;
  @Input()
  set image(image: AbstractImageModel){
    if(this._image != image){
      if(!this.content || this.isError){
        this.loading = true;
        this._img = this.default;
      } else {
        let res = this.sanitizer.bypassSecurityTrustUrl(this.content)
        this.loading = true;
        this._img = res;
      }
    }
  }

  private loading: boolean = false
  onLoad() {
    this.loading = false;
  }

  private isError: boolean = false;
  get content(){
    return (this._image != null) ? this._image.src : this.src
  }

  updateUrl() {
    this.isError = true;
    this.loading = false;
  }

  private _src: string;
  get src(){
    return this._src;
  }

  @Input()
  set src( src: string ){
    if(this._src != src){
      this._src = src;
      if(this.content == null || this.isError){
        this.loading = true;
        this._img = this.default;
      } else {
        let res = this.sanitizer.bypassSecurityTrustUrl(this.content)
        this.loading = true;
        this._img = res;
      }
    }
  }
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {}
}
