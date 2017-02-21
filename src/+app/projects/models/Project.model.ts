import { PostStatusModel } from '../../posts/models/PostStatus.model';
import { PostModel } from '../../posts/models/Post.model';
import { UserModel } from '../../users/models/user.model';
export class ProjectModel {

	public id: string;
	public image: string;
	public title: string;
	public description: string;
	public manager: UserModel;
	public owner: UserModel;
	public clients: string[];
	public editable: boolean;
	public isArchived: boolean;
	public removeable: boolean;
	public lastStatus: PostStatusModel;
	public lastPost: PostModel;
	public date: string;

	constructor(
		id: string,
		title: string,
		description: string,
		image: string,
		manager: UserModel,
		owner: UserModel,
		clients: any[],
		editable: boolean,
		isArchived: boolean,
		removeable: boolean,
		lastStatus: PostStatusModel,
		lastPost: PostModel,
		date: string
		){
		this.id = id;
		this.title = title;
		this.description= description;
		this.image = image;
		this.manager = manager;
		this.owner = owner;
		this.clients = clients.map((client)=>{
      if(typeof client === "string") return client;
      else return client.email;
    });
		this.lastStatus = lastStatus;
		this.lastPost = lastPost;
		this.editable = editable;
		this.isArchived = isArchived;
		this.removeable = removeable;
		this.date = date;
	}

	getAccess(user: UserModel){
		if(user == null) return false;
		return user.id == this.owner.id || user.id == this.manager.id;
	}
}
