export class UserModel {
  protected _id: string;
  get id(): string {
    return this._id;
  }
  protected _name: string | null | undefined;
  get name(): string | null | undefined {
    return this._name;
  }
  protected _photo: string | null | undefined;
  get photo(): string | null | undefined {
    return this._photo;
  }
  protected _phone: string | null | undefined;
  get phone(): string | null | undefined {
    return this._phone;
  }
  protected _email: string;
  get email(): string  {
    return this._email;
  }
  protected _stripeId: string;
  get stripeId(): string  {
    return this._stripeId;
  }
  protected _role: string;
  get role(): string  {
    return this._role;
  }
  protected _stripeSubscriptionId: number;
  get stripeSubscriptionId(): number  {
    return this._stripeSubscriptionId;
  }
  protected _plan: number;
  get plan(): number  {
    return this._plan;
  }
  constructor( obj: { _id: string, name?: string, photo?: string, phone?: string, email?: string, stripeId?: string, stripeSubscriptionId?: number, plan?: number } ){
    if( typeof obj === "object" ){
      this._id = obj._id;
      if(obj.name) this._name = obj.name;
      if(obj.photo) this._photo = obj.photo;
      if(obj.phone) this._phone = obj.phone;
      if(obj.email) this._email = obj.email;

      // * Change this
      this._role = 'Manager';

      if(obj.stripeId) this._stripeId = obj.stripeId;
      if(obj.stripeSubscriptionId) this._stripeSubscriptionId = obj.stripeSubscriptionId;
      if(obj.plan) this._plan = obj.plan;
    }
  }
}
