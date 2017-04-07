import { Injectable, Inject } from '@angular/core';
import { LocalStorage } from '../../helpers/local-storage';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Subject }    from 'rxjs/Subject';
import { AppHeaders, AppHttp } from '../../HTTPHelper';
import { UserAuthModel } from '../models';

class DataView {
  public email: string;
  constructor(obj: {email: string}){
    this.email = obj.email;
  }
}

@Injectable()
export class AuthService {

  private _dataView: DataView;

  set dataView(dataView: {email: string} | DataView){
    if(dataView instanceof DataView && dataView != undefined && dataView != null){
      this._dataView = dataView
    } else {
      this._dataView = new DataView({ email: dataView.email })
    }
  }

  get dataView(){
    if(!this._dataView){
      let obj = { email: '' };
      this._dataView = new DataView(obj);
    }
    return this._dataView;
  }

  loggedIn: boolean = false;
  isLoggedIn() {
    return this.loggedIn;
  }

  private loggedInChange = new Subject<boolean>();
  loggedIn$ = this.loggedInChange.asObservable()

  constructor(private userAuthModel: UserAuthModel, private http: AppHttp, private headers: AppHeaders ) {
    this.loggedIn = this.userAuthModel.checkAuth();
    if( !this.userAuthModel.isSetFromStorage ) this.userAuthModel.setUserFromStorage();
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedInChange.next(loggedIn);
  }


  //** Change this method
  recoverPassword( email: string ){
    let headers = this.headers.getHeader();
    return this.http.post( '/users/recoverPassword', { email }, true, headers )
                    .map((res)=>{
                      ;
                      return res.success;
                    })
  }

  magic(email: string){
    let headers = this.headers.getHeader();
    return this.http.post( '/users/requestMagicLink', { email }, true, headers )
                    .map((res)=>{
                      if ( res ) {
                        console.log(res);
                        return true;
                      }
                      return false;
                    })
  }

  magicLogin(token: string){
    let headers = this.headers.getHeader();
    return this.http.post( '/users/loginMagicLink', { token }, true, headers )
                    .map((res)=>{
                      console.log(res);
                      if ( res.token ) {
                        this.userAuthModel.exit();
                        this.userAuthModel.setUser(res);
                        this.loggedIn = true;
                        this.loggedInChange.next( true );
                        return true;
                      }
                      return false;
                    })
  }


  signup(email: string, password: string, callback){
    let headers = this.headers.getHeader();
    return this.http.post( '/users/signUp', { email, password }, true, headers )
                    .map((res)=>{
                      if ( res.token ) {
                        this.userAuthModel.exit();
                        this.userAuthModel.setUser(res);
                        this.loggedIn = true;
                        this.loggedInChange.next( true );
                        ;
                        return true;
                      }
                      return false;
                    })
  }

  login(email: any, password: any) {
    let headers = this.headers.getHeader();
    return this.http.post( '/users/login', { email, password }, true, headers )
                    .map((res)=>{
                      if ( res.token ) {
                        this.userAuthModel.exit();
                        this.userAuthModel.setUser(res);
                        this.loggedIn = true;
                        this.loggedInChange.next( true );
                        return true;
                      }
                      return false;
                    })
  }

  logout() {
    let webPushToken = this.userAuthModel.authToken;
    this.userAuthModel.exit();
    this.loggedIn = false;
    this.setLoggedIn( false );

    return this.http.post( '/users/login', { webPushToken } )
                    .map((res)=>{
                      ;
                      return true;
                    })
  }
}
