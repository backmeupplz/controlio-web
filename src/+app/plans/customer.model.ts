import { CustomerSource } from './customer-source.model';
export class Customer {

  public sources: CustomerSource;
  public subscriptions: CustomerSource;
  public default_source: string;
  public default: any;
  constructor( sources: CustomerSource, subscriptions: CustomerSource, default_source: string ){
    this.sources = sources;
    this.subscriptions = subscriptions;
    this.default_source = default_source;
    this.default = sources.data.find((elem)=>{
      return elem.id == default_source;
    })
  }
}