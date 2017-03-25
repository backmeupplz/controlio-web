import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';

import { AppConfig } from '../../app.config';
import { AppHeaders } from '../../HTTPHelper';
import { ProjectModel } from '../models/Project.model';
import { UserModel } from '../../users/models/user.model';
import { PostStatusModel } from '../../posts/models/PostStatus.model';
import { PostModel } from '../../posts/models/Post.model';

@Injectable()
export class ProjectService {

  private mainUrl: string;
  constructor(private http: Http, private headers: AppHeaders ){
    this.mainUrl = AppConfig.API_ENDPOINT;
  }

  create( data ){

    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;
    data.type = "manager";
    let request = this.http
      .post(
        mainUrl + '/projects',
         JSON.stringify( data ),
         { headers }
      );
    return request
      .map(res => res.json())
      .map((res) => {
        ;
        return res.success;
      });
  }

  get( projectid ){
    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;



    let request = this.http
      .get(
        mainUrl + '/projects/project' + this.headers.getFormatURL({ projectid }),
         { headers }
      );
    return request
      .map(res => res.json())
      .map((res) => {

        ;
        let managers = [];
        if( res.managers ) managers = res.managers.map((elem)=>{ return new UserModel(elem) });
        let owner = new UserModel(res.owner);

        let post = res.lastPost;
        let lastPost = (post) ? new PostModel(post._id, post.author, null, post.updatedAt, post.text) : null;

        let status = res.lastStatus;
        let lastStatus = (status) ? new PostStatusModel(status._id, status.author, null,status.updatedAt,status.text ) : null;


        let project = new ProjectModel(
          res._id,
          res.title,
          res.description,
          res.image,
          managers,
          owner,
          res.clients,
          true,
          res.isArchived || false,
          true,
          lastStatus,
          lastPost,
          res.updatedAt
          );
        return project;
      });
  }


  update( data: any ){
    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;

    let request = this.http
      .put(
        mainUrl + '/projects',
         JSON.stringify( data ),
         { headers }
      );

    return request
      .map(res => res.json())
      .map((res) => {
        return res.success;
      });
  }

  updateClients( data: any ){
    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;

    let request = this.http
      .post(
        mainUrl + '/projects/clients',
         JSON.stringify( data ),
         { headers }
      );

    return request
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getProjects( skip, limit ){
    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;
    let request = this.http
      .get(
        mainUrl + '/projects' + this.headers.getFormatURL({ skip, limit }),
         { headers }
      );
    return request
      .map(res => res.json())
      .map((data) => {
        ;
        let projects = [];
        data.forEach((res)=>{

          let managers = [];
          if( res.managers ) managers = res.managers.map((elem)=>{ return new UserModel(elem) });
          let owner = new UserModel(res.owner);

          let post = res.lastPost;
          let lastPost = (post) ? new PostModel(post._id, post.author, null, post.updatedAt, post.text) : null;

          let status = res.lastStatus;
          let lastStatus = (status) ? new PostStatusModel(status._id, status.author, null,status.updatedAt,status.text ) : null;

          let project = new ProjectModel(
            res._id,
            res.title,
            res.description,
            res.image,
            managers,
            owner,
            res.clients,
            true,
            res.isArchived || false,
            true,
            lastStatus,
            lastPost,
            res.updatedAt
            );

          projects.push(project);
        })

        ;
        return projects;
      });
  }
}
