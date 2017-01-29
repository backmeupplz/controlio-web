import { Component, Input } from '@angular/core';
import { ImageGalleryModel } from '../helpers/image-galery/ImageGallery.model';
import { ImageModel } from '../helpers/imgb/imgb.model';
import { PostService } from './posts.service';
import { PostModel } from './Post.model';
import { PostStatusModel } from './PostStatus.model';
import { FileImage } from '../helpers/form-elements/FileImage.model';

@Component({
  styles:[`
    :host {
      flex-basis: 100%;
    }

    :host .content {
      width: 100%;
    }

    :host .bottom-block .row {
      display: inline-flex;
      width: 100%;
      margin-left: 0;
      margin-right: 0;
    }

    :host .author {
      padding-bottom: 10px;
    }

    :host .top-block {
      border-bottom-width: 0;
    }

    :host .top-block .author {
      padding: 0;
    }

    :host .bottom-block {
      padding: 0;
      border-radius: 0 0 3px 3px;
    }

    .clip-icon {
      width: 76px;
      flex-basis: 76px;
      max-width: 76px;
      padding-right: 0;
    }

    .clip-icon img {
      padding-top: 18px;
      display: flex;
      margin-left: auto;
    }

    .author .text-block {
      padding-left: 15px;
    }

    .settings-block {
      position: absolute;
      right: 0;
      top: 0;
    }

    .mb-post__gallery {
      margin-top: 8px;
    }

    .mb-post__message, .mb-post__author {
      flex-grow: 1;
    }

    .mb-post__top-block--post {
      padding: 15px 15px 0 !important;
    }

    .mb-post__top-block--status {
      padding: 15px !important;
    }

    .mb-post__edit-button {
      padding: 20px;
    }
    .mb-post__delete-button {
      padding: 20px;
    }

    .mb-post__edit-block {
      margin: 8px -15px;
    }
  `],
  selector: 'post',
  template: require("./post.pug")
})

export class Post {
  componentName: "Post";
  private editMode: boolean = false;
  setEditMode(){
    this.editMode = true;
  }
  resetEditMode(){
    this.editMode = false;
  }

  private images: FileImage[] = [];
  changeFiles(files: FileImage[]){
    this.images = files;
  }

  private resetAll: any;

  private data: any;
  private _post: PostModel;
  @Input()
  set post(post: PostModel | PostStatusModel ){
    if(post instanceof PostModel || post instanceof PostStatusModel ){
      this._post = post;
      console.log(post);
      if( this.post instanceof PostStatusModel && this.post.sender != null){

        console.log("PostStatusModel");

        this.data = {
          title: 'Updated status',
          text: this.post.status,
          photo: this.post.project.image
        }

      } else if( this.post instanceof PostModel && this.post.project != null) {
        console.log("PostModel");

        this.data = {
          title: this.post.sender.role,
          subtitle: this.post.sender.name,
          text: this.post.message,
          photo: this.post.sender.photo
        }
      }

    }
  }

  get post(){
    return this._post;
  }

  postMessageInput( message: string ){
    this.post.message = message;
  }

  constructor(private postService: PostService){}

  removePost(){
    this.postService.delete(this.post.id).subscribe((res)=>{
      console.log(res);
    })
  }

  private setUploadFiles: any;
  editPost(_data){
    let data = _data || {};
    data.postid = this.post.id;
    this.setUploadFiles = ()=>{};
    this.postService.put(this.post.project, data).subscribe((res)=>{
      this.post = res;
      this.resetEditMode();
    })
  }

  edit(){
    if(!this.editMode) return false;
    console.log("start");
    this.setUploadFiles = (err: any, images: any )=>{
      if(!err){
        console.log("upload!!!", images );

        let prevKeys = this.post.gallery.images.filter((elem)=>{
          if(elem.iskey) return true;
        }).map((elem)=>{
          return elem.str
        });

        let keys = images.filter((elem)=>{
          if(!elem.err) return elem;
        }).map((elem)=>{
          return elem.key;
        });

        let data = {
          attachments: prevKeys.concat(keys),
          text: this.post.message,
          type: "post"
        }
        this.editPost(data);
      }
      else {
        console.error(err);
      }
    };
  }

}
