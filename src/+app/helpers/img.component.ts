import { Component, Input } from '@angular/core';
import { BucketService } from '../bucket/bucket.service';
import { ImageClass } from './imgb/imgb.class';
import { ImageModel } from './imgb/imgb.model';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
	selector: "imgb",
	styles: [`
		.imgb {
			overflow: hidden;
	    width: 100%;
	    height: 100%;
		}
	`],
	template: `<img class="{{_styles}}" [src]="_img">`
})

export class ImageComponent extends ImageClass {

	@Input()
	set key( key: string ){
		this.setKey(key);
	}

	private _styles: string = "imgb";
	@Input()
	set styles(styles: string){
		this._styles = styles || "imgb";
	}

	@Input()
	set str( str: string ){
		this.setStr(str);
	}

	@Input()
	set image( img: ImageModel ){
		if(img){
			if(img.iskey){
				this.setKey(img.str);
			} else {
				let str = this.sanitizer.bypassSecurityTrustUrl(img.str);
				this.setStr(str);
			}
		}
	}

	constructor(protected bucket: BucketService, private sanitizer: DomSanitizer){
		super(bucket);
	}

}
