import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';
import { AppSettings } from '../app-settings';
import { AppHeaders } from '../helpers/http/AppHeaders.service';
import { User } from './user.model';

@Injectable()
export class UserService {


  loggedIn: boolean = false;
  private user: any = null;
  private loggedInChange = new Subject<boolean>();
  loggedIn$ = this.loggedInChange.asObservable()

  setLoggedIn(loggedIn: boolean) {
    this.loggedInChange.next(loggedIn);
  }


  private mainUrl = AppSettings.API_ENDPOINT;

  constructor(private http: Http, private headers: AppHeaders){
    this.loggedIn = !!localStorage.getItem('auth_token');
  }


  getAuthUser(){
    if( this.user == null && this.isLoggedIn() ){
      this.user = new User({
        "email": localStorage.getItem('email'),
        "name": localStorage.getItem('name'),
        "phone": localStorage.getItem('phone'),
        "photo": localStorage.getItem('photo'),
        "_id": localStorage.getItem('userId'),
        "stripeId": localStorage.getItem('stripeId'),
        "stripeSubscriptionId": localStorage.getItem('stripeSubscriptionId'),
        "plan": localStorage.getItem('plan')
      });
    }
    return this.user;
  }


  recoverPassword( email ){

    let headers = this.headers.getHeader();
    let mainUrl = this.mainUrl;
    let request = this.http
      .post(
        mainUrl + '/users/recoverPassword',
        JSON.stringify({ email }),
        { headers }
      );

    return request
      .map(res => res.json())
      .map((res) => {

        if (res.success) {
          localStorage.clear();
          this.setTokens( res.token, res._id );
          this.setUser( res );
          this.loggedIn = true;
        }

        return res.success;
      });

  }



  signup(email, password, callback){

    let headers = this.headers.getHeader();
    let mainUrl = this.mainUrl;
    let request = this.http
      .post(
        mainUrl + '/users/signUp',
         JSON.stringify({ email, password }),
         { headers }
      );

    return request
      .map(res => res.json())
      .map((res) => {

        console.log( res );
        if ( res.token ) {
          localStorage.clear();
          this.setTokens( res.token, res._id );
          this.setUser( res );
          this.loggedIn = true;
          this.loggedInChange.next( true );

          return true;
        }

        return false;
      });
  }


  setTokens( token, userId ){
    localStorage.removeItem('auth_token');
    localStorage.setItem('auth_token', token);
    localStorage.removeItem('userId');
    localStorage.setItem('userId', userId );
  }

  setUser( user ){
    localStorage.removeItem('email');
    localStorage.setItem('email', user.email || "" );
    localStorage.removeItem('name');
    localStorage.setItem('name', user.name || "" );
    localStorage.removeItem('phone');
    localStorage.setItem('phone', user.phone || "" );
    localStorage.removeItem('stripeId');
    localStorage.setItem('stripeId', user.stripeId );
    localStorage.removeItem('photo');
    localStorage.setItem('photo', user.photo );
    localStorage.removeItem('stripeSubscriptionId');
    localStorage.setItem('stripeSubscriptionId', user.stripeSubscriptionId );
    localStorage.removeItem('plan');
    localStorage.setItem('plan', user.plan );
  }

  login(email: any, password: any) {

    let headers = this.headers.getHeader();

    let mainUrl = this.mainUrl;

    return this.http
      .post(
        mainUrl + '/users/login',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {

        if ( res.token ) {
          console.log(res);
          localStorage.clear();
          this.setTokens( res.token, res._id );
          this.setUser( res );
          this.loggedIn = true;
          this.loggedInChange.next( true );

          return true;
        }

        return false;
      });
  }

  convertToBusiness(){

    let mainUrl = this.mainUrl;

    let headers = this.headers.getAuthHeader()


    return this.http
      .post(
        mainUrl + '/users/convertToBusiness',
        JSON.stringify({}),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if ( res ) {
          return true;
        }
        return false;
      });
  }

  setSubsciption( planid: number ) {

    let mainUrl = this.mainUrl;

    let headers = this.headers.getAuthHeader();

    return this.http
      .post(
        mainUrl + '/payments/customer/subscription',
        JSON.stringify({ planid }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if ( res ) {
          return true;
        }
        return false;
      });
  }

  logout() {

    let headers = this.headers.getAuthHeader();


    let mainUrl = this.mainUrl;
    let webPushToken = localStorage.getItem('auth_token');

    localStorage.clear();
    this.user = null;
    this.loggedIn = false;
    this.setLoggedIn( false );

    return this.http
      .post(
        mainUrl + '/users/logout',
        JSON.stringify({ webPushToken }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {

        return false;
      });

  }

  isLoggedIn() {
    return this.loggedIn;
  }


  addManager( email ){

    let headers = this.headers.getAuthHeader()

    let mainUrl = this.mainUrl;

    return this.http
      .post(
        mainUrl + '/users/manager',
        JSON.stringify({ email }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getUser( userId ){

    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;

    return this.http
        .get(
          mainUrl + '/users' + this.headers.getFormatURL({ userId }),
          { headers }
        )
        .map(res => res.json())
        .map((res) => {
          return res;
        });

  }

  getAuthUsers(){

    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;

    return this.http
        .get(
          mainUrl + '/users/managers',
          { headers }
        )
        .map(res => res.json())
        .map((res) => {
          console.log(res);
          return res;
        });

  }

  getProfile() {

    let mainUrl = this.mainUrl;
    let headers = this.headers.getAuthHeader();
    return this.http
      .get( mainUrl + '/users/profile', { headers })
      .map(res => res.json())
      .map((res)=>{

        let user = new User(res);
        console.log(user)
        this.setUser(user);
        return this.getAuthUser();
      })
  }

  editProfile( name: string, phone: string, photo: string ){

    let headers = this.headers.getAuthHeader()
    let mainUrl = this.mainUrl;

    return this.http
      .post(
        mainUrl + '/users/profile',
        JSON.stringify({ name, phone, photo }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        this.setUser(res);
        return res;
      });
  }
}
