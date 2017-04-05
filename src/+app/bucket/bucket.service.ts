import { Injectable, Inject } from '@angular/core';
import { AppHttp, AppHeaders } from '../HTTPHelper';
import { LocalStorage } from '../helpers/local-storage';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class BucketService {

  public progress$: Observable<any>;
  private progressObserver: any;

	constructor(private http: AppHttp, private headers: AppHeaders, @Inject(LocalStorage) private localStorage){
    let self = this;
    this.progress$ = Observable.create(observer => {
        self.progressObserver = observer
    }).share();
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



  makeFileRequest(url: string, file: any, key: string, callabackUploadProgress?: any) {
    const self = this;
    return Observable.fromPromise(new Promise((resolve, reject) => {

        let formData: any = new FormData();
        let xhr = new XMLHttpRequest()
        formData.append('image', file, file.name);
        formData.append('key', key );


        xhr.upload.onprogress = (event:any) => {
          let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);



          // callabackUploadProgress(40);
          // setTimeout(()=>{
          //   callabackUploadProgress(70);
          // }, 1000)
          // setTimeout(()=>{
          //   callabackUploadProgress(100);
          // }, 2000)

          console.log("self.progressObserver", self.progressObserver)
          if(self.progressObserver) self.progressObserver.next({key, progress});
          if(callabackUploadProgress) callabackUploadProgress(progress);
        };

        xhr.onprogress = function(event) {
          //let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let res = xhr.response
                    let isUploaded = true;
                    self.progressObserver.next({key, res, isUploaded});
                    resolve(JSON.parse(xhr.response))
                } else {
                    let error = xhr.response
                    self.progressObserver.next({key, error});
                    reject(xhr.response)
                }
            }
        }
        xhr.open("POST", url, true)
        xhr.send(formData)
    }));
  }

  uploadImage( key, file, callabackUploadProgress?: any ){

    let self = this;
    //let headers = this.headers.getFileHeader();

    let formData: any = new FormData();
    formData.append('image', file, file.name);
    formData.append('key', key );

    return this.makeFileRequest('upload',file, key, callabackUploadProgress).map((res)=>{
              return res;
            },(err)=>{
              console.error("Failed to retrieve an object: " + err );
              return err;
            })
    /*
    return this.http.postFile( 'upload', formData, false, headers )
            .map((res)=>{
              ;
              ;
              return res;
            },(err)=>{
              console.error("Failed to retrieve an object: " + err );
              return err;
            })*/
	}

	getImage( key ){
		if( key && key.length > 0 ){
		let self = this;
    return this.http.get( 'img', { key }, false )
            .map((res)=>{
              return self.store_data( key, res );
            },(err)=>{
              console.error("Failed to retrieve an object: " + err );
              return err;
            })
	  }
  }

}
