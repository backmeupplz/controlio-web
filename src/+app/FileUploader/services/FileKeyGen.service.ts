import { Injectable, Inject } from '@angular/core';

//@todo перенести LocalStorage
import { LocalStorage } from '../../helpers/local-storage';

@Injectable()
export class FileKeyGenService {
  constructor( @Inject(LocalStorage) private localStorage ) {}

  checkExt( name: string, formats: string[] ){
    let format = name.split(".");
    return formats.indexOf(format[1]) > -1;
  }

  generateKey( file: any ){
    return (file.name != undefined ) ? this.getStringFormat( file.name ) : null;
  }

  getStringFormat( name ){
    let format = name.split(".");
    format = format[format.length - 1];
    let userId = this.localStorage.getItem('userId');
    let uniqueString =  Math.random().toString(36).substring(7);
    let timestamp = Date.now() / 1000 | 0;
     let str = userId + "/" + uniqueString + "-" + timestamp + "." + format;
    return str;
  }
}
