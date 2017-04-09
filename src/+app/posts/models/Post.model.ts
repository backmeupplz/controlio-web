import { ProjectModel } from '../../projects/models/Project.model';
// import { ImageGalleryModel } from '../helpers/image-galery/ImageGallery.model';
// import { FilesGalleryModel } from '../helpers/image-galery/FilesGallery.model';
// import { ImageModel } from '../helpers/imgb/imgb.model';
import { UserModel } from '../../users/models/user.model';
// import { IRemovableImage } from '../helpers/image-galery/IRemovableImage.interface';
// import { IRemovableFile } from '../helpers/image-galery/IRemovableFile.interface';
// import { FileModel } from '../helpers/form-elements/File.model';
import { UserAuthModel } from '../../auth';
import { FileCollection } from '../../Collection';
import { FileModel, FileImageModel } from '../../Files/models';

// implements IRemovableFile
export class PostModel {
  protected _id: string;
  get id(){
    return this._id;
  }
  set id(id: string){
    if(!this._isSave){
      this._id = id;
    }
  }

  protected _project: ProjectModel;
  get project(){
    return this._project;
  }

  protected _sender: UserModel | UserAuthModel;
  get sender(){
    return this._sender;
  }

  protected _date: string;
  set date(date: string){
    this._date = date;
  }
  get date(){
    return this._date;
  }

  protected _text: string;
  set text(text: string){
    this._text = text;
  }
  get text(){
    return this._text;
  }

  protected _type: string = 'post';
  get type(){
    return this._type;
  }

  protected _gallery: FileCollection<FileModel> = null;
  set gallery(gallery: FileCollection<FileModel>){
   this._gallery = gallery;
  }
  get gallery(){
   return this._gallery;
  }

  protected _isSave: boolean;
  save(post: PostModel){
    this._id = post.id;
    this._date = post.date;
    this._isSave = true;
  }
  get isSave(){
    return this._isSave;
  }

  protected _editable: boolean;
  get editable(){
    return this._editable;
  }
  protected _removable: boolean;
  get removable(){
    return this._removable;
  }

  constructor( id: string, sender: UserModel | UserAuthModel, project: ProjectModel, date: string, text?: string, editable?: boolean, removable?: boolean, attachments?: string[], isSave?: boolean ){
    this._id = id;
    this._isSave = isSave === false ? false : true;
    this._sender = sender;
    if(text) this.text = text;
    this._project = project;
    this._editable = false || editable;
    this._removable = false || removable;

    console.log('attachments', attachments)
    if(attachments != null){
      this.createGallery( attachments );
    }
  }

  // removeFile(file: FileModel){
  //
  // }

  createGallery( keys: string[] ){
    this.gallery = new FileCollection<FileModel>();
    return keys.map((key)=>{
      let file = new FileImageModel(key, null, true);
      this.gallery.push(file)
      return file
    })
  }
}
