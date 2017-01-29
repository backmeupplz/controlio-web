import { Headers } from '@angular/http';
import { Injectable } from '@angular/core'
import { AppSettings } from '../app-settings';

@Injectable()
export class AppHeaders {

	private mainUrl = AppSettings.API_ENDPOINT;

	getMainURL(){
		return this.mainUrl;
	}

	getHeaderBase(): Headers {
		return new Headers({
      'Content-Type': AppSettings.CONTENT_TYPE,
      'Access-Control-Allow-Origin': AppSettings.ACESS_CONTROL_ALLOW_ORIGIN,
      'apiKey':  AppSettings.API_KEY,
    });
	}

	getHeader( params?: any ): Headers {
		let headers = this.getHeaderBase();
		if( typeof params === "object" ){
      for( let prop in params ){
        headers.append( prop, params[prop] );
      }
		}
		return headers;
	}

	getAuthHeader( params?: any ): Headers {
		if( !params ){
		  params = {
				'userId': localStorage.getItem('userId'),
	      'token': localStorage.getItem('auth_token')
    	}
		} else {
      params['userId'] = localStorage.getItem('userId');
      params['token'] = localStorage.getItem('auth_token');
    }

		let headers = this.getHeader( params );
		return headers;
	}

	getFormatURL( params: any ): string {
		let str = "";
		let count = 0;
		if( typeof params === "object" ){
			for( let prop in params ){
				count++;
				str += count == 1 ? '?' + prop + '=' + params[prop] : '&' + prop + '=' + params[prop];
			}
  	}
		return str;
	}

}
