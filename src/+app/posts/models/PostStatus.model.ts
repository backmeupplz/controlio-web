import { ProjectModel } from '../../projects/models/Project.model';
import { PostModel } from './Post.model';
import { UserModel } from '../../users/models/user.model';

export class PostStatusModel extends PostModel {
	private _status: string;
  get status(){
    return this._status;
  }
	constructor( id: string, sender: UserModel, project: ProjectModel, date: string, status: string, isSave?: boolean ){
		super(id, sender, project, date);
    this._isSave = isSave === false ? false : true;
		this._status = status;
		this._type = 'status';
		this._editable = false;
	}
}
