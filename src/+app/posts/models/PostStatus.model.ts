import { ProjectModel } from '../../projects/models/Project.model';
import { PostModel } from './Post.model';
import { UserModel } from '../../users/models/user.model';
import { UserAuthModel } from '../../auth';

export class PostStatusModel extends PostModel {
	constructor( id: string, sender: UserModel | UserAuthModel, project: ProjectModel, date: string, text: string, isSave?: boolean,  isEdited?: boolean ){
		super(id, sender, project, date, text);
    this._isSave = isSave === false ? false : true;
    this._isEdited = isEdited === false ? false : true;
		this._type = 'status';
		this._editable = true;
	}
}
