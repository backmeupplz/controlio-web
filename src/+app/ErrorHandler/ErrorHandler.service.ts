import { Injectable } from '@angular/core';
import { ErrorServer, ErrorCommon, ErrorServerConnect, ErrorRequest } from './models';

@Injectable()
export class ErrorHandlerService {
  createError(data: any){
    if(data.status != undefined){
      if(data.status == 0){
        return new ErrorServerConnect()
      } else if(data.status >= 500 || data.status < 600){
        return new ErrorServer({
          title: "Undefined Error!",
          status: data.status,
          type: data.type || 0,
          message: data.message || "Undefined Error!"
        })
      } else if(data.status >= 400 || data.status < 500){
        return new ErrorRequest({
          status: data.status,
          type: data.type || 0,
          message: data.message || "Undefined Error!"
        })
      } else {
        return new ErrorCommon({
          title: "Undefined Error",
          type: data.type || 0,
          message: data.message || "Undefined Error!"
        })
      }
    } else {
      return new ErrorCommon({
        title: "Undefined Error",
        type: data.type || 0,
        message: data.message || "Undefined Error!"
      })
    }
  }
}
