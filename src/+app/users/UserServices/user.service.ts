import { Injectable, Inject } from '@angular/core';
import { UserModel } from '../models/user.model';
import { AppHttp } from '../../HTTPHelper';

@Injectable()
export class UserService {
  constructor(private http: AppHttp){}

  getUser( userId ){
    return this.http.get('/users', { userId }).map((res) => {
          return res;
        });
  }

  getUsers(){
    return this.http.get('/users/managers').map((res) => {
          return res;
        });
  }

  getProfile() {
    return this.http.get('/users/profile').map((res) => {
          let user = new UserModel(res);
          
          return user;
        });
  }

  editProfile( name: string, phone: string, photo: string ){
    return this.http.post('/users/profile', { name, phone, photo }).map((res) => {
          let user = new UserModel(res);
          
          return user;
        });
  }
}
