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
import { FileUploadService } from '../../FileUploader';

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
      padding-right: 15px;
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


    .mb-post__delete-button, .mb-post__edit-button, .mb-post__cancel-button {
      padding: 20px 0 20px 20px;
      cursor: pointer;
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

    .mb-post__edit-button {
      display: none;
    }


    :host:hover .mb-post__edit-button, .mb-post__text-info {
      display: inline-flex;
    }

    .mb-post__text-info {
      white-space:nowrap;
      padding: 20px 0 20px 20px;
    }

    .mb-post__text-info span {
      padding-right: .5em;
    }

    @media screen and (max-width: 450px) {
      :host:hover .mb-post__text-info {
        display: none;
      }
      .mb-post__edit-button, .mb-post__text-info, .mb-post__cancel-button, .mb-post__delete-button {
        padding:  1em 0  1em 1em;
      }
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
    this.collectionMessage = this.post.gallery;
    this.myForm.reset({text: this.post.text})
    this.editMode = true;
  }
  resetEditMode(){
    this.collectionMessage = this.post.gallery;
    this.myForm.reset({text: this.post.text})
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
    if(post instanceof PostModel || post instanceof PostStatusModel ){
      this._post = post;
      if( this.post instanceof PostStatusModel && this.post.sender != null){
        this.data = {
          title: 'Updated status',
          text: this.post.text || `Attachments(${post.gallery.length})`,
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
  constructor(private postService: PostService, private _fb: FormBuilder, private message: FormMessageService,private fileUploadService: FileUploadService){
    this.listMessages = message.createList(["message"]);
  }

  removePost(){
    this.postService.delete(this.post).subscribe((res)=>{

    })
  }

  private setUploadFiles: any;
  editPost(_data){
    let data = _data || {};
    data.postid = this.post.id;
    data.attachments = this.post.gallery.map((elem)=>{ return elem.key; });

    // this.postService.put(this.post.project, data).subscribe((res)=>{
    //   this.post = res;
    //   this.resetEditMode();
    // })
  }

  public myForm: FormGroup;
  ngOnInit(){
    this.myForm = new FormGroup({
      text: new FormControl(this.post.text, [<any>Validators.maxLength(this.congif.MESSAGE_MAX_LENGTH)]),
    });
  }

  saveRequest (data: any, post: PostModel) {
    console.log(data, post);

    this.postService.put( post.project, data ).subscribe( res => {
      this.post.save(res);
      if( post instanceof PostStatusModel ) this.post.project.lastStatus = post;
      else {
        this.post.gallery = this.collectionMessage
      }
      this.resetEditMode()
    }, (err)=>{
      console.error(err);
    });
  }

  private collectionMessage: FileCollection<FileModel> = new FileCollection<FileModel>();

  edit(_data: any, isValid: boolean){
    if(!this.editMode) return false;
    let data = _data || {};
    data.projectid = this.post.project.id;
    data.postid = this.post.id;

    if(this.collectionMessage.length <= 0 ){
      this.saveRequest(data, this.post);
    } else {
      let itemsProcessed = 0;
      let count = this.collectionMessage.length;
      data.attachments = [];
      this.collectionMessage.forEach((file: FileModel)=>{
        if(file.isUploaded) {
          itemsProcessed++;
          if(count == itemsProcessed) {
            this.saveRequest(data, this.post);
          }
          data.attachments.push(file.key)
          return file.key;
        }
        file.onFileProgress((err, res)=>{
          console.log(err, res, count, itemsProcessed)
          itemsProcessed++;
          if(!err) data.attachments.push(file.key)
          if(count == itemsProcessed) {
            this.saveRequest(data, this.post);
          }
        },(progress)=>{

        })

        let upload = ()=>{
          this.fileUploadService.uploadOn(file.key, file.file, file.loadFile, file.loadFileProgress)
        }
        upload()
        file.uploadFunc = upload;

        return file.key;
      })
    }
  }

}
