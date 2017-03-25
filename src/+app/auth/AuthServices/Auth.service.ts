import { Injectable, Inject } from '@angular/core';
import { LocalStorage } from '../../helpers/local-storage';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Subject }    from 'rxjs/Subject';
import { AppHeaders, AppHttp } from '../../HTTPHelper';
import { UserAuthModel } from '../models';

@Injectable()
export class AuthService {


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
    ;
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
                        ;
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
