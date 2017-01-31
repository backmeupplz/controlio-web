import { AppSettings } from '../../app-settings';
import { BucketService } from '../../bucket/bucket.service';
import { SafeUrl } from '@angular/platform-browser';

export class ImageClass {

	protected _key: string;
	protected _src: string | SafeUrl;
	protected _img: any = AppSettings.DEFAUL_IMG || "";
  get img(){
    console.log("returem _img", this._img);
  	return this._img;
  }
	get str(){
  	return this._key || this._src;
  }

	setKey( key: string ){
		if( key ){

  		if( this._src ) throw new Error("ImageComponent must have only one str or key property");
  		this._key = key;
      let cash = this.bucket.getCachedImg( this._key );
      if( cash ){
        this._img = cash;
      } else if( this._key != "undefined" ) {
        this.bucket.getImage(  this._key ).subscribe((data)=>{
          let array = data.Body.data;
          let base64Data = btoa(String.fromCharCode.apply(null, array));
          let image = document.createElement('img');
          image.src = 'data:image/png;base64,' + base64Data;
          this._img = image.src;
        }, (err)=>{
          console.error(err);
        })
      }
    }
	}
	setStr( str: string | SafeUrl ){
		if(!str) return;
		if( this._key ) throw new Error("ImageComponent must have only one str or key property");
		this._src = this._img = str;
	}

	constructor(protected bucket: BucketService){}

}
