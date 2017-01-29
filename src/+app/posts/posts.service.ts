import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';
import { AppHeaders } from '../helpers/http/AppHeaders.service';
import { PostStatusModel } from './PostStatus.model';
import { PostModel } from './Post.model';
import { ProjectModel } from '../projects/Project.model';

@Injectable()
export class PostService {

  constructor( private http: Http, private headers: AppHeaders ){}

  create( project: ProjectModel, data: any ){

    let headers = this.headers.getAuthHeader();

    let request = this.http
      .post(
        this.headers.getMainURL() + '/posts',
         JSON.stringify( data ),
         { headers }
      );

    return request
      .map(res => res.json())
      .map((res) => {
        let post;
        let sender = project.manager;
        if(res.type == 'status'){
          post = new PostStatusModel(res._id, sender, project, res.updatedAt, res.text);
        }  else if(res.type == 'post'){
          post = new PostModel(res._id, sender,project,res.updatedAt,res.text, true, true, res.attachments);
        }
        return post;
      });
  }

  put( project: ProjectModel, data: any ){

    let headers = this.headers.getAuthHeader();

    let request = this.http
      .put(
        this.headers.getMainURL() + '/posts',
         JSON.stringify( data ),
         { headers }
      );

    return request
      .map(res => res.json())
      .map((res) => {
        let post;
        let sender = project.manager;
        if(res.type == 'status'){
          post = new PostStatusModel(res._id, sender, project, res.updatedAt, res.text);
        }  else if(res.type == 'post'){
          post = new PostModel(res._id, sender,project,res.updatedAt,res.text, true, true, res.attachments);
        }
        return post;
      });
  }


  get( postid ){
    let headers = this.headers.getAuthHeader();

    let request = this.http
      .get(
        this.headers.getMainURL() + '/posts' + this.headers.getFormatURL({ postid }),
         { headers }
      );

    return request
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  delete( postid ){
    let headers = this.headers.getAuthHeader();

    let request = this.http
      .delete(
        this.headers.getMainURL() + '/posts' + this.headers.getFormatURL({ postid }),
         { headers }
      );

    return request
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getPosts( project: ProjectModel, skip: number, limit: number ){
    let headers = this.headers.getAuthHeader();

    let projectid = project.id;
    let request = this.http
      .get(
        this.headers.getMainURL() + '/posts' + this.headers.getFormatURL({ projectid, skip, limit }),
         { headers }
      );

    return request
      .map(res => res.json())
      .map((res) => {
        let posts = [];
        res.forEach((elem)=>{
          if(elem.type == 'status'){
            posts.push(new PostStatusModel(elem._id, elem.manager, project, elem.updatedAt, elem.text));
          }  else if(elem.type == 'post'){
            posts.push(new PostModel(elem._id,project.manager,project,elem.updatedAt,elem.text, true, true, elem.attachments));
          }
        })
        return posts;
      });
  }
}
