import { Injectable, Inject } from '@angular/core';
import { LocalStorage } from '../../LocalStorage/local-storage';
import { CookieService } from 'angular2-cookie/services';
import { UserModel } from '../../users';

@Injectable()
export class UserAuthModel {

  protected _id: string;
  get id(): string {
    return this._id;
  }
  protected _name: string | null | undefined;
  get name(): string | null | undefined {
    return this._name;
  }
  protected _photo: string | null | undefined;
  get photo(): string | null | undefined {
    return this._photo;
  }
  protected _phone: string | null | undefined;
  get phone(): string | null | undefined {
    return this._phone;
  }
  protected _email: string;
  get email(): string  {
    return this._email;
  }
  protected _stripeId: string;
  get stripeId(): string  {
    return this._stripeId;
  }
  protected _role: string;
  get role(): string  {
    return this._role;
  }
  protected _stripeSubscriptionId: number;
  get stripeSubscriptionId(): number  {
    return this._stripeSubscriptionId;
  }
  protected _plan: number;
  get plan(): number  {
    return this._plan;
  }

  protected _authToken: string;
  get authToken(): string {
    return this._authToken;
  }
  protected _isSetFromStorage: boolean = false;
  get isSetFromStorage() : boolean {
    return this._isSetFromStorage;
  }

  constructor(@Inject(LocalStorage) private localStorage, private cookieService: CookieService ){}

  exit(){
    this._name = null;
    this._email = null;
    this._id = null;
    this._authToken = null;
    this._phone = null;
    this._stripeId = null;
    this._stripeSubscriptionId = null;
    this._email = null;
    this._plan = null;
    this.localStorage.clear();
    this.cookieService.remove('auth_token');
    this.cookieService.remove('userId');
  }

  checkAuth() : boolean {
    return !!this.localStorage.getItem('auth_token') || !!this.cookieService.get( "auth_token" );
  }

  setUserFromStorage(){
    if(this.checkAuth()){
      let userDataStorage = this.getUserDataFromStorage();
      this.setUser(userDataStorage);
    }
  }


  protected getUserDataFromStorage() : any {
    return {
      auth_token: this.getItemStorage('auth_token'),
      id: this.getItemStorage('userId'),
      email: this.getItemStorage('email'),
      name: this.getItemStorage('name'),
      phone: this.getItemStorage('phone'),
      photo: this.getItemStorage('photo'),
      stripeId: this.getItemStorage('stripeId'),
      stripeSubscriptionId: this.getItemStorage('stripeSubscriptionId'),
      plan: this.getItemStorage('plan')
    }
  }

  private setItemCookie(key: string, value: any){
    this.cookieService.put( key, value );
  }

  private getItemStorage( key: string ): string {
    return this.localStorage.getItem( key );
  }

  private setItemStorage( key: string, value: any ){
    this.localStorage.removeItem( key );
    this.localStorage.setItem( key, value );
  }

  set authToken(token: string){
    if(token){
      this.setItemCookie( 'auth_token', token );
      this.setItemStorage('auth_token', token);
      this._authToken = token;
    }
  }

  set id(id: string){
    if(id){
      this.setItemCookie('userId', id);
      this.setItemStorage('userId', id);
      this._id = id;
    }
  }

  set email(email: string){
    if(email){
      this.setItemStorage('email', email);
      this._email = email;
    }
  }

  set name(name: string){
    if(name){
      this.setItemStorage('name', name);
      this._name = name;
    }
  }

  set phone(phone: string){
    if(phone){
      this.setItemStorage('phone', phone);
      this._phone = phone;
    }
  }

  set stripeId(stripeId: string){
    if(stripeId){
      this.setItemStorage('stripeId', stripeId);
      this._stripeId = stripeId;
    }
  }

  set photo(photo: string){
    if(photo){
      this.setItemStorage('photo', photo);
      this._photo = photo;
    }
  }

  set stripeSubscriptionId(stripeSubscriptionId: number){
    if(stripeSubscriptionId){
      this.setItemStorage('stripeSubscriptionId', stripeSubscriptionId);
      this._stripeSubscriptionId = stripeSubscriptionId;
    }
  }

  set plan(plan: number){
    if(plan){
      this.setItemStorage('plan', plan);
      this._plan = plan;
    }
  }

  setUser( user ){
    if( typeof user === "object" ){
      if(user.token) this.authToken = user.token;
      if(user._id) this.id = user._id;
      if(user.name) this.name = user.name;
      if(user.photo) this.photo = user.photo;
      if(user.phone) this.phone = user.phone;
      if(user.email) this.email = user.email;
      if(user.stripeId) this.stripeId = user.stripeId;
      if(user.stripeSubscriptionId) this.stripeSubscriptionId = user.stripeSubscriptionId;
      if(user.plan) this.plan = user.plan;
    }
  }
}
