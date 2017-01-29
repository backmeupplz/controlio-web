import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectListElem } from './project_list_elem.component.js';
import { ProjectService } from './project.service';
import { PostService } from '../posts/posts.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FileImage } from '../helpers/form-elements/FileImage.model';
import { ProjectModel } from './Project.model';

@Component({
  styles: ['.you-dont-have-project .text { max-width: 375px; } .input-block { margin-bottom: 24px; } :host { padding-bottom: 240px; }'],
  selector: 'projects',
  template: require("./project.pug")
})


export class Project {
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

  isUploadFile( isUpload: boolean ){
    this.setUploadFiles = false;
    console.log("isUpload", isUpload)
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
    private postService: PostService
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



  changeClients( emails: string[] ){
    this.clients = emails;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.isLoading = true;
      this.projectService.get( params['id'] ).subscribe( res => {
        this.project = res;
        console.log("project", this.project, this);
        if(!this.project == null ){
          this.isLoading = false;
          this.title = `This is project deleted or not exist`;
        } else {
          if(  this.project.clients ) this.clients = this.project.clients.map((client)=>{ return client; });
          this.postService.getPosts( this.project, 0, 10 ).subscribe( res => {
            this.posts = res;
            this.isLoading = false;
          });
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

    this.postService.create( this.project, data ).subscribe( res => {
      console.log( "create res ", res );
      this.posts.unshift(res);
      this.resetAll = ()=>{
        console.log("reset all");
      };
      if( res.type == "status" ) this.project.lastStatus = res;
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
    if(this.actionCheckedID == 0){
      console.log("Загрузить картинки и получить сообщение");
      this.setUploadFiles = (err: any, images: any )=>{
        if(!err){
          console.log("upload!!!", images );
          let keys = images.filter((elem)=>{
            if(!elem.err) return elem;
          }).map((elem)=>{
            return elem.key;
          });

          let data = {
            attachments: keys,
            text: this.message,
            type: "post"
          }
          this.createPost(data);
        }
        else {
          console.error(err);
        }
      };
    } else if(isValid && this.actionCheckedID == 1){
      this.createPost(_data);
    }
  }
}
