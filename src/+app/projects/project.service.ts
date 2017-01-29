import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';
import { AppSettings } from '../app-settings';
import { AppHeaders } from '../helpers/http/AppHeaders.service';
import { ProjectModel } from './Project.model';
import { User } from '../users/user.model';
import { PostStatusModel } from '../posts/PostStatus.model';
import { PostModel } from '../posts/Post.model';

@Injectable()
export class ProjectService {

  private mainUrl = AppSettings.API_ENDPOINT;
  constructor(private http: Http, private headers: AppHeaders ){}

  create( data ){

    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;

    let request = this.http
      .post(
        mainUrl + '/projects',
         JSON.stringify( data ),
         { headers }
      );
    return request
      .map(res => res.json())
      .map((res) => {
        console.log(res);
        return res.success;
      });
  }

  get( projectid ){
    let headers = this.headers.getAuthHeader();
    let mainUrl = this.mainUrl;


    console.log("headers", this.headers.getFormatURL({ projectid }), headers )
    let request = this.http
      .get(
        mainUrl + '/projects/project' + this.headers.getFormatURL({ projectid }),
         { headers }
      );
    return request
      .map(res => res.json())
      .map((res) => {

        console.log("res", res);
        let manager = new User(res.manager);
        let owner = new User(res.owner);

        let post = res.lastPost;
        let lastPost = (post) ? new PostModel(post._id, manager, null, post.updatedAt, post.text) : null;

        let status = res.lastStatus;
        let lastStatus = (status) ? new PostStatusModel(status._id, manager, null,status.updatedAt,status.text ) : null;

        console.log("lastPost: ", lastPost, "lastStatus:", lastStatus)
        let project = new ProjectModel(
          res._id,
          res.title,
          res.description,
          res.image,
          manager,
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
        console.log(data);
        let projects = [];
        data.forEach((res)=>{
          let manager = new User(res.manager);
          let owner = new User(res.owner);

          let post = res.lastPost;
          let lastPost = (post) ? new PostModel(post._id, manager, null, post.updatedAt, post.text) : null;

          let status = res.lastStatus;
          let lastStatus = (status) ? new PostStatusModel(status._id, manager, null,status.updatedAt,status.text ) : null;
          let project = new ProjectModel(
            res._id,
            res.title,
            res.description,
            res.image,
            manager,
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
        return projects;
      });
  }
}
