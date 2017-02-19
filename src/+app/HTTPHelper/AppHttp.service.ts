import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppHeaders } from './AppHeaders.service';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class AppHttp {
	constructor(private http: Http, private headers: AppHeaders ){}

	get( URL: string, data?: any, mainUrl?: boolean ){
		let headers = this.headers.getAuthHeader();
    let mainURL = (mainUrl == false) ? '' : this.headers.getMainURL()
		return this.http.get( mainURL + URL + this.headers.getFormatURL( data ), { headers } )
										.map(res=>res.json())
                    .catch((err: any)=>{
                      console.log(err);
                      return Observable.throw(err);
                    });
	}

  postFile( URL: string, data: any = {}, mainUrl?: boolean, _headers?: any ){
    let headers = (_headers) ? _headers : this.headers.getAuthHeader();
    let mainURL = (mainUrl == false) ? '' : this.headers.getMainURL();
    return this.http.post( mainURL + URL, data, { headers } )
            .map(res=>res.json())
            .catch((err: any)=>{
              console.log(err);
              return Observable.throw(err);
            });
  }

	post( URL: string, data: any = {}, mainUrl?: boolean, _headers?: any ){
		let headers = (_headers) ? _headers : this.headers.getAuthHeader();
    let mainURL = (mainUrl == false) ? '' : this.headers.getMainURL();
		return this.http.post( mainURL + URL, JSON.stringify( data ), { headers } )
						.map(res=>res.json())
            .catch((err: any)=>{
              console.log(err);
              return Observable.throw(err);
            });
	}

	put( URL: string, data: any = {} ){
		let headers = this.headers.getAuthHeader();
		return this.http.put( this.headers.getMainURL() + URL, JSON.stringify( data ), { headers } )
						.map(res=>res.json())
	}

	delete( URL: string, data?: any ){
		let headers = this.headers.getAuthHeader();
		return this.http.delete( this.headers.getMainURL() + URL + this.headers.getFormatURL( data ), { headers } )
										.map(res=>res.json())
	}

}
