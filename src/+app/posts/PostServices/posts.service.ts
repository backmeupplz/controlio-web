import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject }    from 'rxjs/Subject';
import { AppHeaders } from '../../HTTPHelper';
import { PostStatusModel } from '../models/PostStatus.model';
import { PostModel } from '../models/Post.model';
import { ProjectModel } from '../../projects/models/Project.model';
import { UserService, UserModel } from '../../users';
import { UserAuthModel } from '../../auth';

@Injectable()
export class PostService {

  constructor( private http: Http, private headers: AppHeaders, private userModel: UserAuthModel ){}

  create( project: ProjectModel, data: any, sender?: UserModel | UserAuthModel ){
    if(!sender) sender = this.userModel;


    if(data.type == 'status'){
      return new PostStatusModel( null, sender, project, null, data.status, false);
    }  else if(data.type == 'post'){
      return new PostModel( null, sender, project, null, data.text, true, true, data.attachments, false);
    }
    return null;
  }

  save( project: ProjectModel, data: any ){

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
        let author = new UserModel(res.author)
        if(res.type == 'status'){
          post = new PostStatusModel(res._id, author, project, res.updatedAt, res.text);
        }  else if(res.type == 'post'){
          post = new PostModel(res._id, author,project,res.updatedAt,res.text, true, true, res.attachments);
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

        let author = new UserModel(res.author)
        if(res.type == 'status'){
          post = new PostStatusModel(res._id, author, project, res.updatedAt, res.text);
        }  else if(res.type == 'post'){
          post = new PostModel(res._id, author,project,res.updatedAt,res.text, true, true, res.attachments);
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
    let body = { postid };

    let request = this.http
      .delete(
        this.headers.getMainURL() + '/posts',
         { headers, body }
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


          let author = new UserModel(elem.author)
          if(elem.type == 'status'){
            posts.push(new PostStatusModel(elem._id, author, project, elem.updatedAt, elem.text));
          }  else if(elem.type == 'post'){
            posts.push(new PostModel(elem._id, author,project,elem.updatedAt,elem.text, true, true, elem.attachments));
          }
        })
        return posts;
      });
  }
}
