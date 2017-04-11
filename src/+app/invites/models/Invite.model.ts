import { ProjectModel } from '../../projects';
import { UserModel } from '../../users';

export class InviteModel {
  date: string;
  sender: UserModel;
  project: ProjectModel;
  id: string;
  type: string;
  invitee: string;
  accept: boolean = null;
  constructor(obj: {
    date: string,
    sender: any,
    project: any,
    _id: string,
    type: string,
    invitee: string
  }){
    this.date = obj.date;
    this.sender = obj.sender;
    this.project = obj.project;
    this.id = obj._id;
    this.type = obj.type;
    this.invitee = obj.invitee;
  }
}
