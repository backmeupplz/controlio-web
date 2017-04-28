import { Injectable, Inject } from '@angular/core';
import { AppHttp, AppHeaders } from '../HTTPHelper';
import { LocalStorage } from '../helpers/local-storage';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/fromPromise';
import { AppConfig } from '../app.config';

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


	getCachedImg( key: string ){
		const imgSrc = null;
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
          if(self.progressObserver) self.progressObserver.next({key, progress});
          if(callabackUploadProgress) callabackUploadProgress(progress);
        };

        xhr.upload.onerror = function (event: any) {

          if(self.progressObserver) self.progressObserver.next({ key: key, err: "error"});
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
                     self.progressObserver.next({ key: key, isUploaded: true });
                    resolve(JSON.parse(xhr.response))
                } else {
                    let error = xhr.response
                    self.progressObserver.next({key, error});
                    self.progressObserver.next({ key: key, err: error});
                    reject(xhr.response)
                }
            }
        }
        xhr.open("POST", url, true)

        let authHeaders = this.headers.getAuthParams();
        let commonHeaders = this.headers.getHeaderBaseParams();

        xhr.setRequestHeader('userId', authHeaders.userId)
        xhr.setRequestHeader('token', authHeaders.token)
        xhr.setRequestHeader('apiKey', commonHeaders.apiKey)

        xhr.send(formData)
    }));
  }

  uploadImage( key, file, callabackUploadProgress?: any ){

    let self = this;
    //let headers = this.headers.getFileHeader();

    let formData: any = new FormData();
    formData.append('image', file, file.name);
    formData.append('key', key );

    return this.makeFileRequest( AppConfig.API_ENDPOINT + '/img', file, key, callabackUploadProgress).map((res)=>{
              return res;
            },(err)=>{
              console.error("Failed to retrieve an object: " + err );
              return err;
            })
	}

	getImage( key ){
		if( key && key.length > 0 ){
    return this.http.getFile('/img', { key }, 'image/jpeg')
            .map((res)=>{
              return res;
            },(err)=>{
              return err;
            })
	  }
  }

}
