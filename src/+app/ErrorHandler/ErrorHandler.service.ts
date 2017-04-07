import { Injectable } from '@angular/core';
import { ErrorServer, ErrorCommon, ErrorServerConnect, ErrorRequest } from './models';

@Injectable()
export class ErrorHandlerService {
  createError(data: any){
    console.log(data);
    if(data.json != undefined) data = data.json()

    if(data.status != undefined){
      if(data.status == 0){
        return new ErrorServerConnect(data)
      } else if(data.status >= 500 || data.status < 600){
        return new ErrorServer({
          title: "Server Error!",
          status: data.status,
          type: data.type || 0,
          message: data.message || "Server Error!",
          data: data
        })
      } else if(data.status >= 400 || data.status < 500){
        return new ErrorRequest({
          status: data.status,
          type: data.type || 0,
          message: data.message || "Request Error!",
          data: data
        })
      } else {
        return new ErrorCommon({
          title: "Undefined Error",
          type: data.type || 0,
          message: data.message || "Undefined Error!",
          data: data
        })
      }
    } else {
      return new ErrorCommon({
        title: "Undefined Error",
        type: data.type || 0,
        message: data.message || "Undefined Error!",
        data: data
      })
    }
  }
}
