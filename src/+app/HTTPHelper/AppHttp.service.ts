import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppHeaders } from './AppHeaders.service';
import { Observable }     from 'rxjs/Observable';
import { ErrorHandlerService } from '../ErrorHandler/ErrorHandler.service'

@Injectable()
export class AppHttp {
  constructor(private http: Http, private headers: AppHeaders, private errorHandlerService: ErrorHandlerService ){}

  catchError(err: any){
    console.log(this.errorHandlerService)
    let error = this.errorHandlerService.createError(err)
    return Observable.throw(error)
  }

  get( URL: string, data?: any, mainUrl?: boolean ){

    console.log(URL)

    let headers = this.headers.getAuthHeader();
    let mainURL = (mainUrl == false) ? '' : this.headers.getMainURL()
    return this.http.get( mainURL + URL + this.headers.getFormatURL( data ), { headers } )
                    .map(res=>res.json())
                    .catch((err: any)=>this.catchError(err));
  }

  postFile( URL: string, data: any = {}, mainUrl?: boolean, _headers?: any ){
    let headers = (_headers) ? _headers : this.headers.getAuthHeader();
    let mainURL = (mainUrl == false) ? '' : this.headers.getMainURL();
    return this.http.post( mainURL + URL, data, { headers } )
            .map(res=>res.json())
            .catch((err: any)=>this.catchError(err));
  }

  post( URL: string, data: any = {}, mainUrl?: boolean, _headers?: any ){
    let headers = (_headers) ? _headers : this.headers.getAuthHeader();
    let mainURL = (mainUrl == false) ? '' : this.headers.getMainURL();
    return this.http.post( mainURL + URL, JSON.stringify( data ), { headers } )
            .map(res=>res.json())
            .catch((err: any)=>this.catchError(err));
  }

  put( URL: string, data: any = {} ){
    let headers = this.headers.getAuthHeader();
    return this.http.put( this.headers.getMainURL() + URL, JSON.stringify( data ), { headers } )
            .map(res=>res.json())
            .catch((err: any)=>this.catchError(err));
  }

  delete( URL: string, data?: any, body?: any ){
    let headers = this.headers.getAuthHeader();
    return this.http.delete( this.headers.getMainURL() + URL + this.headers.getFormatURL( data ), { headers, body } )
                    .map(res=>res.json())
                    .catch((err: any)=>this.catchError(err));
  }

}
