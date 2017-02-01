import { Injectable, Inject } from '@angular/core';
import { AppHttp } from '../helpers/http/AppHttp.service';
import { Observable }     from 'rxjs/Observable';
import { AppHeaders } from '../helpers/http/AppHeaders.service';
import { LocalStorage } from '../helpers/local-storage';


@Injectable()
export class BucketService {
	private identy: string = "us-east-1:16327515-a666-4f4b-b7b9-d7c831b285c0";
	private region: string = "us-east-1";
	private bucketName: string = 'controlio';
	private bucket: any;
	private s3: any;


	constructor(private http: AppHttp, private headers: AppHeaders, @Inject(LocalStorage) private localStorage){
    console.log("BucketService");
  }

	store_data( key: string, data: any ) {
    let array = data.Body.data;

    if( btoa != undefined ){
      let base64Data = btoa(String.fromCharCode.apply(null, array));
      let image = document.createElement('img');
  		image.src = 'data:image/png;base64,' + base64Data;
  		this.localStorage.setItem( key, image.src );
    }

	  return data;
	}

	getCachedImg( key: string ){
		const imgSrc = this.localStorage.getItem(key);
		if( imgSrc ){
			return imgSrc;
		} else {
			return null;
		}
	}


  uploadImage( key, file ){

    let self = this;
    console.log(file);
    let headers = this.headers.getFileHeader();

    let formData: any = new FormData();
    formData.append('image', file, file.name);
    formData.append('key', key );

    return this.http.postFile( 'upload', formData, false, headers )
            .map((res)=>{
              console.log(res);
              console.log("вызов store_data");
              return res;
            },(err)=>{
              console.error("Failed to retrieve an object: " + err );
              return err;
            })
	}

	getImage( key ){
		if( key.length > 0 ){
		let self = this;
    return this.http.get( 'img', { key }, false )
            .map((res)=>{
              console.log(res);
              console.log("вызов store_data");
              return self.store_data( key, res );
            },(err)=>{
              console.error("Failed to retrieve an object: " + err );
              return err;
            })
	  }
  }

}
