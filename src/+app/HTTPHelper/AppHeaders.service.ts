import { Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core'
import { AppConfig } from '../app.config';
import { LocalStorage } from '../helpers/local-storage';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class AppHeaders {

	private mainUrl = AppConfig.API_ENDPOINT;
  constructor( @Inject(LocalStorage) private localStorage, private cookieService: CookieService ){}

	getMainURL(){
		return this.mainUrl;
	}

	getHeaderBase( contentType?: string ): Headers {
		return new Headers({
      'Content-Type': (contentType) ? contentType : AppConfig.CONTENT_TYPE,
      'Access-Control-Allow-Origin': AppConfig.ACESS_CONTROL_ALLOW_ORIGIN,
      'apiKey':  AppConfig.API_KEY,
    });
	}

	getHeader( params?: any ): Headers {
		let headers = this.getHeaderBase();
		if( typeof params === "object" ){
      for( let prop in params ){
        if(!headers.has(prop)){
          headers.append( prop, params[prop] );
        } else {
          headers.set(prop, params[prop])
        }
      }
		}
		return headers;
	}

	getAuthHeader( params?: any ): Headers {
		if( !params ){
		  params = {
				'userId': this.localStorage.getItem('userId') || this.cookieService.get( "userId" ),
	      'token': this.localStorage.getItem('auth_token') || this.cookieService.get( "auth_token" )
    	}
		} else {
      params['userId'] = this.localStorage.getItem('userId') || this.cookieService.get( "userId" );
      params['token'] = this.localStorage.getItem('auth_token') || this.cookieService.get( "auth_token" );
    }

		let headers = this.getHeader( params );
		return headers;
	}

  getFileHeader( params?: any ): Headers {

    if( !params ){
      params = {
        'userId': this.localStorage.getItem('userId') || this.cookieService.get( "userId" ),
        'token': this.localStorage.getItem('auth_token') || this.cookieService.get( "auth_token" )
      }
    } else {
      params['userId'] = this.localStorage.getItem('userId') || this.cookieService.get( "userId" );
      params['token'] = this.localStorage.getItem('auth_token')  || this.cookieService.get( "auth_token" );
    }

    let headers = new Headers({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': AppConfig.ACESS_CONTROL_ALLOW_ORIGIN,
      'apiKey':  AppConfig.API_KEY,
    })

   // headers.append('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')
    return headers;
  }

	getFormatURL( params: any ): string {
    var str = "";
    if( typeof params === "object" ){
      for (var key in params) {
        if (str != "") {
           str += "&";
        } else {
          str += "?"
        }
        str += key + "=" + encodeURIComponent(params[key]);
      }
    }
    return str;
	}
}
