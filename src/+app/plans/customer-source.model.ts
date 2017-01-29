export class CustomerSource {
  public total_count: number = 0;
  public data: any;
  constructor( total_count: number, data: any ){
    this.total_count = total_count;
    this.data = data;
  }
}