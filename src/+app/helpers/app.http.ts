import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppHeaders } from './headers';

@Injectable()
export class AppHttp {
	constructor(private http: Http, private headers: AppHeaders ){}

	get( URL: string, data?: any ){
		let headers = this.headers.getAuthHeader();
		return this.http.get( this.headers.getMainURL() + URL + this.headers.getFormatURL( data ), { headers } )
										.map(res=>res.json())
	}

	post( URL: string, data: any = {} ){
		let headers = this.headers.getAuthHeader();
		return this.http.post( this.headers.getMainURL() + URL, JSON.stringify( data ), { headers } )
						.map(res=>res.json())
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
