import { PostStatusModel } from '../posts/PostStatus.model';
import { PostModel } from '../posts/Post.model';
import { User } from '../users/user.model';
export class ProjectModel {

	public id: string;
	public image: string;
	public title: string;
	public description: string;
	public manager: User;
	public owner: User;
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
		manager: User,
		owner: User,
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

	getAccess(user: User){
		if(user == null) return false;
		return user.id == this.owner.id || user.id == this.manager.id;
	}
}
