import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectListElem } from './project_list_elem.component.js';
import { ProjectService } from './project.service';
import { PostService } from '../posts/posts.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FileImage } from '../helpers/form-elements/FileImage.model';
import { ProjectModel } from './Project.model';
import { PostStatusModel } from '../posts/PostStatus.model';
import { MessageForm } from '../helpers/form-elements/MessageForm.component';
import { FileUploadService } from '../helpers/form-elements/FileUploadService.service';
import { FilesGalleryModel } from '../helpers/image-galery/FilesGallery.model';

@Component({
  styles: ['.you-dont-have-project .text { max-width: 375px; } .input-block { margin-bottom: 24px; } :host { padding-bottom: 240px; } .project-post-block { padding-bottom: 90px; }'],
  selector: 'projects',
  template: require("./project.pug")
})


export class Project {

  @ViewChild('messageForm') messageForm: MessageForm;

  componentName: "Project";
  private project: ProjectModel;
  public myForm: FormGroup;
  private posts: any = [];
  private strings: any = {
    'UPDATED_STATUS': 'UPDATED STATUS'
  };
  private actionCheckedID: number = 0;
  private actions: any = [];
  private title: string = "";

  private setUploadFiles: any;
  private message: string;
  private resetAll: any;
  private isChangeClients: boolean = false;

  onScroll () {
    this.loadPosts();
  }


  isUploadFile( isUpload: boolean ){
    this.setUploadFiles = false;
  }

  postMessageInput( message: string ){
    this.message = message;
  }

  private images: FileImage[] = [];
  changeFiles(files: FileImage[]){
    this.images = files;
  }

  private isLoading: boolean = true;

  private clients: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private postService: PostService,
    private fileUploadService: FileUploadService
  ){
    this.title = 'Loading ...';
    this.myForm = new FormGroup({
      text: new FormControl('')
    });

    let self = this;
    this.actions = [
      {
        id: 0,
        title: "New message",
        action: function(){
          self.actionCheckedID = 0;
        }
      },
      {
        id: 1,
        title: "Change status",
        action: function(){
          self.actionCheckedID = 1;
        }
      },
      {
        id: 2,
        title: "Edit clients",
        action: function(){
          self.actionCheckedID = 2;
        }
      }
    ];


  }



  changeClients( data: any ){
    this.clients = data.value;
    this.isChangeClients = data.isChanged;
  }


  private limitPostLoad = 10;
  private skipPosts = 0;
  loadPosts(){
    this.postService.getPosts( this.project, this.skipPosts, this.limitPostLoad ).subscribe( res => {
      this.skipPosts += this.limitPostLoad;
      this.posts = this.posts.concat(res);
      this.isLoading = false;
    });
  }


  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.isLoading = true;
      this.projectService.get( params['id'] ).subscribe( res => {
        this.project = res;
        if(!this.project == null ){
          this.isLoading = false;
          this.title = `This is project deleted or not exist`;
        } else {
          if( this.project.clients ) this.clients = this.project.clients;
          this.loadPosts();
        }
      });
    });
  }

  addPost(_data, isValid: boolean){
     let data = _data || {};
     data.type = "post";
     this.save( data, isValid );
  }

  changeStatus(_data, isValid: boolean ){
     let data = _data || {};
     data.type = "status";
     this.save( data, isValid );
  }

  createPost(_data: any){

    let data = _data || {};
    data.projectid = this.project.id;
    this.myForm.reset()

    let post = this.postService.create( this.project, {
              text: data.text,
              type: data.type
            });

    console.log(post);
    this.posts.unshift(post);
    this.resetAll = ()=>{};
    this.setUploadFiles = ()=>{};
    if( post instanceof PostStatusModel ) this.project.lastStatus = post;


    console.log("Create post!", new Date());
    this.postService.save( this.project, data ).subscribe( res => {
      //
      //  Тут нужно обработать ошибку!
      //

      console.log("Save post!", new Date());
      post.save(res);
      //this.resetAll = ()=>{};
      //this.setUploadFiles = ()=>{};
      //if( res.type == "status" ) this.project.lastStatus = res;
    });
  }


  updateClients(isValid: boolean){
    let data = {
      clients: this.clients,
      projectid: this.project.id
    };

    this.projectService.updateClients( data ).subscribe( res => {
      console.log(res);
    });
  }

  save( _data, isValid: boolean ){
    console.log(_data,isValid)
    let self = this;
    if(this.actionCheckedID == 0){
      //this.messageForm.uploadFilesVoid();

      this.fileUploadService.uploadGallery(this.messageForm.fileGallery);
      /*
      this.setUploadFiles = {
        callback: (err: any, images: any )=>{
          console.log("Callback file upload")
          // if(!err){
          //   let keys = images.filter((elem)=>{
          //     if(!elem.err) return elem;
          //   }).map((elem)=>{
          //     return elem.key;
          //   });

          //   let data = {
          //     attachments: keys,
          //     text: this.message,
          //     type: "post"
          //   }
          //   this.createPost(data);
          // }
          // else {
          //   console.error(err);
          // }
        },
        uploadCallback(err: any, images: any){
          if(!err){
            let keys = images.filter((elem)=>{
              if(!elem.err) return elem;
            }).map((elem)=>{
              return elem.key;
            });

            let data = {
              attachments: keys,
              text: self.message,
              type: "post"
            }
            self.createPost(data);
          }
          else {
            console.error(err);
          }
        }
      };*/
    } else if(isValid && this.actionCheckedID == 1){
      this.createPost({ status: self.message, type: status });
    }
  }
}
