import { Headers } from '@angular/http';
import { Injectable } from '@angular/core'
import { AppSettings } from '../../app-settings';

@Injectable()
export class AppHeaders {

	private mainUrl = AppSettings.API_ENDPOINT;

	getMainURL(){
		return this.mainUrl;
	}

	getHeaderBase( contentType?: string ): Headers {
		return new Headers({
      'Content-Type': (contentType) ? contentType : AppSettings.CONTENT_TYPE,
      'Access-Control-Allow-Origin': AppSettings.ACESS_CONTROL_ALLOW_ORIGIN,
      'apiKey':  AppSettings.API_KEY,
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

  getFileHeader( params?: any ): Headers {

    if( !params ){
      params = {
        'userId': localStorage.getItem('userId'),
        'token': localStorage.getItem('auth_token')
      }
    } else {
      params['userId'] = localStorage.getItem('userId');
      params['token'] = localStorage.getItem('auth_token');
    }

    let headers = new Headers({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': AppSettings.ACESS_CONTROL_ALLOW_ORIGIN,
      'apiKey':  AppSettings.API_KEY,
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
