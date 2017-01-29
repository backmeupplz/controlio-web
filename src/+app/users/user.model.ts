export class User {
  public id: string;
  public name: string | null | undefined;
  public photo: string | null | undefined;
  public phone: string | null | undefined;
  public email: string;
  public stripeId: string;
  public role: string;
  public stripeSubscriptionId: number;
  public plan: number;
  constructor( obj: any ){
    if( typeof obj === "object" ){
      this.id = obj._id;
      this.name = obj.name || "";
      this.photo = obj.photo || "";
      this.phone = obj.phone || "";
      this.email = obj.email || "";
      this.role = 'Manager';
      this.stripeId = obj.stripeId || "";
      this.stripeSubscriptionId = obj.stripeSubscriptionId;
      this.plan = obj.plan;
    }
  }
}
