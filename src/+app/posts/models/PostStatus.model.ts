import { ProjectModel } from '../projects/Project.model';
import { PostModel } from './Post.model';
import { User } from '../users/user.model';

export class PostStatusModel extends PostModel {
	private _status: string;
  get status(){
    return this._status;
  }
	constructor( id: string, sender: User, project: ProjectModel, date: string, status: string, isSave?: boolean ){
		super(id, sender, project, date);
    this._isSave = isSave === false ? false : true;
		this._status = status;
		this._type = 'status';
		this._editable = false;
	}
}
