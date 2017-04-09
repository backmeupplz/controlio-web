import { Component, Input } from '@angular/core';
// import { FilesGalleryModel } from '../helpers/image-galery/FilesGallery.model';
// import { ImageModel } from '../helpers/imgb/imgb.model';
import { PostService } from '../PostServices/posts.service';
import { PostModel } from '../models/Post.model';
import { PostStatusModel } from '../models/PostStatus.model';
// import { FileImage } from '../helpers/form-elements/FileImage.model';
// import { FileModel } from '../helpers/form-elements/File.model';
import { FileCollection } from '../../Collection';
import { FileModel } from '../../Files/models';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormMessageService } from '../../FormHelper';
import { VALIDATOR_CONFIG_PROJECT } from '../../app.config';

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
      padding-top: 32px;
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

    .mb-post--not-saved {
      opacity: .5;
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

    .bottom-block {
      margin-bottom: 15px;
    }

    .post-gallery {
      border-top: 1px solid #eaeaea;
      padding-top: 15px;
      margin-top: 15px;
      padding-left: 0;
      margin-left: 15px;
    }
  `],
  selector: 'post',
  template: require("./post.pug")
})

export class PostComponent {

  private congif: any  = {
    MESSAGE_MAX_LENGTH: VALIDATOR_CONFIG_PROJECT.MESSAGE_MAX_LENGTH
  }

  private gallery: FileCollection<FileModel>
  private editMode: boolean = false;
  setEditMode(){
    this.editMode = true;
  }
  resetEditMode(){
    this.editMode = false;
  }

  // private files: FileModel[] = [];
  // changeFiles(files: FileModel[]){
  //   this.files = files;
  // }

  get mods(){
    let type = this.post.gallery != null && this.post.gallery.length > 0 ? 'post' : 'status';
    let saved = this.post.isSave ? 'saved' : 'not-saved';
    return type + ' ' + saved;
  }

  private resetAll: any;

  private data: any;
  private _post: PostModel;
  @Input()
  set post(post: PostModel | PostStatusModel ){
    console.log(post)
    if(post instanceof PostModel || post instanceof PostStatusModel ){
      this._post = post;
      if( this.post instanceof PostStatusModel && this.post.sender != null){
        this.data = {
          title: 'Updated status',
          text: this.post.text,
          photo: this.post.project.image,
          subtitle: (this.post.sender) ? (this.post.sender.name ||this.post.sender.email) : "No name",
        }
      } else if( this.post instanceof PostModel && this.post.project != null) {
        this.data = {
          title: (this.post.sender) ? (this.post.sender.role||'user') : "No role",
          subtitle: (this.post.sender) ? (this.post.sender.name ||this.post.sender.email) : "No name",
          text: this.post.text,
          photo: (this.post.sender) ? this.post.sender.photo : null
        }
      }
    }
  }

  get post(){
    return this._post;
  }

  postMessageInput( message: string ){
    this.post.text = message;
  }

  private listMessages: any = {};
  constructor(private postService: PostService, private _fb: FormBuilder, private message: FormMessageService,){
    this.listMessages = message.createList(["message"]);
  }

  removePost(){
    this.postService.delete(this.post.id).subscribe((res)=>{
      ;
    })
  }

  private setUploadFiles: any;
  editPost(_data){
    let data = _data || {};
    data.postid = this.post.id;
    data.attachments = this.post.gallery.map((elem)=>{ return elem.key; });
    console.log(data);
    // this.postService.put(this.post.project, data).subscribe((res)=>{
    //   this.post = res;
    //   this.resetEditMode();
    // })
  }

  public myForm: FormGroup;
  ngOnInit(){
    this.myForm = new FormGroup({
      text: new FormControl('', [<any>Validators.maxLength(this.congif.MESSAGE_MAX_LENGTH)]),
    });
  }

  edit(){
    if(!this.editMode) return false;
    /*
    this.setUploadFiles = {
      callback: (err: any, images: any )=>{

      },
      uploadCallback: (err: any, images: any )=>{
        if(!err){
          ;

          let prevKeys = this.post.gallery.files.filter((elem)=>{
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
      }
    }*/
  }

}
