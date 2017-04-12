import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';

import { AppConfig } from '../../app.config';
import { AppHeaders, AppHttp } from '../../HTTPHelper';
import { ProjectModel } from '../models/Project.model';
import { UserModel } from '../../users/models/user.model';
import { PostStatusModel } from '../../posts/models/PostStatus.model';
import { PostModel } from '../../posts/models/Post.model';

@Injectable()
export class ProjectService {

  private mainUrl: string;
  constructor(private http: AppHttp, private headers: AppHeaders ){
    this.mainUrl = AppConfig.API_ENDPOINT;
  }

  create( data ){
    let mainUrl = this.mainUrl;
    data.type = "manager";
    let request = this.http
      .post('/projects', data);
    return request
      .map((res) => {
        return res.success;
      });
  }

  get( projectid ){
    let request = this.http
      .get('/projects/project', { projectid });
    return request
      .map((res) => {

        let managers = [];
        if( res.managers ) managers = res.managers.map((elem)=>{ return new UserModel(elem) });
        let owner = new UserModel(res.owner);

        let post = res.lastPost, lastPost = null;

        if(post){
          let postAuthor = new UserModel(post.author)
          lastPost = (post) ? new PostModel(post._id, postAuthor, null, post.updatedAt, post.text) : null;
        }

        let status = res.lastStatus, lastStatus = null;

        if(status){
          let statusAuthor = new UserModel(status.author)
          lastStatus = (status) ? new PostStatusModel(status._id, statusAuthor, null,status.updatedAt,status.text ) : null;
        }

        let project = new ProjectModel({
          _id: res._id,
          title: res.title,
          description: res.description,
          image: res.image,
          managers,
          owner,
          clients: res.clients,
          editable: true,
          isArchived: res.isArchived || false,
          removeable: true,
          lastStatus,
          lastPost,
          updatedAt: res.updatedAt
        });
        return project;
      });
  }


  update( data: any ){
    let mainUrl = this.mainUrl;

    let request = this.http
      .put('/projects', data);

    return request
      .map((res) => {
        return res.success;
      });
  }

  updateClients( data: any ){
    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;

    let request = this.http
      .post('/projects/clients', data);

    return request
      .map((res) => {
        return res;
      });
  }

  getProjects( skip, limit ){
    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;
    let request = this.http
      .get('/projects', { skip, limit });
    return request
      .map((data) => {
        let projects = [];
        data.forEach((res)=>{

          let managers = [];
          if( res.managers ) managers = res.managers.map((elem)=>{ return new UserModel(elem) });
          let owner = new UserModel(res.owner);

          let post = res.lastPost, lastPost = null;

          if(post){
            let postAuthor = new UserModel(post.author)
            lastPost = (post) ? new PostModel(post._id, postAuthor, null, post.updatedAt, post.text, false, false, post.attachments) : null;
          }

          let status = res.lastStatus, lastStatus = null;

          if(status){
            let statusAuthor = new UserModel(status.author)
            lastStatus = (status) ? new PostStatusModel(status._id, statusAuthor, null,status.updatedAt,status.text ) : null;
          }

          let project = new ProjectModel(
            {
              _id: res._id,
              title: res.title,
              description: res.description,
              image: res.image,
              managers,
              owner,
              clients: res.clients,
              editable: true,
              isArchived: res.isArchived || false,
              removeable: true,
              lastStatus,
              lastPost,
              updatedAt: res.updatedAt
            }
            );

          projects.push(project);
        })
        return projects;
      });
  }
}
