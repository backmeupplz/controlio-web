import { Component, Input} from "@angular/core";
import { BucketService } from '../bucket/bucket.service';
import { ImageClass } from './imgb/imgb.class';

@Component({
		styles: [`
			:host .imgsb__image {
				display: block;
				width: 100%;
				height: 100%;
				background-size: cover;
				background-repeat: no-repeat;
				background-position: 50% 50%;
			}
		`],
    selector: "imgsb",
    template: `<div class="imgsb__image" [style.background-image]="'url(' + _img + ')'"></div>`
})

export class ImageBackgroudComponent extends ImageClass {

	@Input() 
	set key( key: string ){
		this.setKey(key);
	}
	@Input()
	set str( str: string ){
		this.setStr(str);
	}

	constructor(protected bucket: BucketService){
		super(bucket);
	}
}