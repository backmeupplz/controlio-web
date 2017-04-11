import { PostStatusModel } from '../../posts/models/PostStatus.model';
import { PostModel } from '../../posts/models/Post.model';
import { UserModel } from '../../users/models/user.model';
export class ProjectModel {

	public id: string;
	public image: string;
	public title: string;
	public description: string;
	public managers: UserModel[];
	public owner: UserModel;
	public clients: string[];
	public editable: boolean;
	public isArchived: boolean;
	public removeable: boolean;
	public lastStatus: PostStatusModel;
	public lastPost: PostModel;
	public date: string;

	constructor(
    obj: {
  		_id: string,
  		title: string,
  		description: string,
  		image: string,
  		managers: UserModel[],
  		owner: UserModel,
  		clients: any[],
  		editable: boolean,
  		isArchived: boolean,
  		removeable: boolean,
  		lastStatus: PostStatusModel,
  		lastPost: PostModel,
  		updatedAt: string
    }
		){
		this.id = obj._id;
		this.title = obj.title;
		this.description= obj.description;
		this.image = obj.image;
		this.managers = obj.managers;
		this.owner = obj.owner;
		this.clients = (obj.clients) ? obj.clients.map((client)=>{
      if(typeof client === "string") return client;
      else return client.email;
    }) : [];
		this.lastStatus = obj.lastStatus;
		this.lastPost = obj.lastPost;
		this.editable = obj.editable;
		this.isArchived = obj.isArchived;
		this.removeable = obj.removeable;
		this.date = obj.updatedAt;
	}

	getAccess(user: UserModel){
		if(user == null) return false;
		return user.id == this.owner.id || this.managers.findIndex((elem)=>{ return elem.id == user.id }) > -1;
	}
}
