import { Component, ViewChild } from '@angular/core';
import { UserAuthModel } from '../../auth';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectModel } from '../models/Project.model';
import { ProjectService } from '../ProjectServices';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormMessageService } from '../../FormHelper';
import { VALIDATOR_CONFIG_PROJECT } from '../../app.config';
import { PostModel, PostStatusModel } from '../../posts/models';
import { PostService } from '../../posts/PostServices';
// import { ProjectListElem } from './project_list_elem.component.js';
// import { ProjectService } from '../ProjectServices/project.service';
// import { PostService } from '../../posts/PostServices/posts.service';

// import { FileImage } from '../helpers/form-elements/FileImage.model';
// import { PostStatusModel } from '../../posts/models/PostStatus.model';

// import { MessageForm } from '../../FormHelper';
//(inputChange)="postMessageInput($event)",
// import { FileUploadService } from '../helpers/form-elements/FileUploadService.service';
// import { FilesGalleryModel } from '../helpers/image-galery/FilesGallery.model';


@Component({
  styles: [`
    .you-dont-have-project .text { max-width: 375px; }
    .input-block { margin-bottom: 24px; }
    :host { padding-bottom: 240px; }
    .project-post-block { padding-bottom: 90px; }`
  ],
  selector: 'projects',
  template: require("./project.pug"),
  providers: [FormMessageService]
})


export class Project {
  private congif: any  = {
    MESSAGE_MAX_LENGTH: VALIDATOR_CONFIG_PROJECT.MESSAGE_MAX_LENGTH
  }

  // @ViewChild('messageForm') messageForm: MessageForm;
  public myForm: FormGroup;
  public myFormClients: FormGroup;
  public myFormStatus: FormGroup;

  private title: string = "Not found project";
  private project: ProjectModel;
  private isLoading: boolean = false;
  private clients: string[] = [];
  private actions: any[] = [
    {
      id: 0,
      title: "New message",
      action: this.setTab(0)
    },
    {
      id: 1,
      title: "Change status",
      action: this.setTab(1)
    },
    {
      id: 2,
      title: "Edit clients",
      action: this.setTab(2)
    }
  ];
  private actionCheckedID: number = 0;
  private StatusLoading: any = {
    loading: {
      title: 'Loading...'
    },
    noFoundProject: {
      title: 'This is project deleted or not exist'
    }
  }

  private listMessages: any = {};
  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
   private message: FormMessageService,
   private user: UserAuthModel,
    private postService: PostService,
    // private fileUploadService: FileUploadService
  ){
    this.listMessages = message.createList(["message"]);
  }

  setStatusLoading(status: { title: string }){
    this.title = status.title;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.isLoading = true;
      this.setStatusLoading(this.StatusLoading.loading)
      this.projectService.get( params['id'] ).subscribe( res => {
        this.project = res;
        if(!this.project == null ){
          this.isLoading = false;
          this.setStatusLoading(this.StatusLoading.noFoundProject)
        } else {
          if( this.project.clients ) this.clients = this.project.clients;
          this.loadPosts();
        }
      });
    });

    this.myForm = new FormGroup({
      text: new FormControl('', [<any>Validators.maxLength(this.congif.MESSAGE_MAX_LENGTH)]),
      // managers: new FormControl([]),
    });

    this.myFormClients = new FormGroup({
      clients: new FormControl([])
    })


    this.myFormStatus = new FormGroup({
      text: new FormControl(''),
    })
  }

  // Posts

  onScroll () {

    //this.loadPosts();
  }


  // Panel

  setTab(_id: number){
    let id = _id;
    return ()=>{
      this.actionCheckedID = id;
    }
  }

  changeStatus(_data, isValid: boolean ){
     let data = _data || {};
     data.type = "status";
     this.save( data, isValid );
  }

  addPost(_data, isValid: boolean){
    let data = _data || {};
    data.type = "post";
    this.save( data, isValid );
  }

  updateClients(_data, isValid: boolean){

  }

  createPost(_data: any){
    let data = _data || {};
    data.projectid = this.project.id;

    let post = this.postService.create( this.project, {
              text: data.text,
              type: data.type
            });

    this.posts.unshift(post);
    this.myForm.reset()
    if( post instanceof PostStatusModel ) this.project.lastStatus = post;

    this.postService.save( this.project, data ).subscribe( res => {
      post.save(res);
    });
  }

  private posts: any = [];

  private limitPostLoad = 10;
  private skipPosts = 0;

  loadPosts(){
    this.postService.getPosts( this.project, this.skipPosts, this.limitPostLoad ).subscribe( res => {
      this.skipPosts += this.limitPostLoad;
      this.posts = this.posts.concat(res);
      this.isLoading = false;
    });
  }


  /*
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




  changeClients( data: any ){
    this.clients = data.value;
    this.isChangeClients = data.isChanged;
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

*/

  save( _data, isValid: boolean ){
    if(!isValid) return;
    if(this.actionCheckedID == 0){
      this.createPost(_data);
    } else if(isValid && this.actionCheckedID == 1){
      this.createPost(_data);
    }
  }
}
