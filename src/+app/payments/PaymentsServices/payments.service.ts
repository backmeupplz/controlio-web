import { Injectable } from '@angular/core';
import { AppHttp } from '../../HTTPHelper';
import { Customer } from '../models/customer.model';
import { CustomerSource } from '../models/customer-source.model';

@Injectable()
export class PaymentsService {

  private baseURL: string = '/payments/customer';
  constructor(private http: AppHttp ){}

  getCustomer( customerid: string ){
    return this.http.get( this.baseURL, { customerid } )
                    .map((res)=>{

                      if( res.sources != null && res.subscriptions != null ){
                        let sources = new CustomerSource( res.sources.total_count, res.sources.data );
                        let subscriptions = new CustomerSource( res.subscriptions.total_count, res.subscriptions.data );
                        let customer = new Customer(sources, subscriptions, res.default_source );

                        ;

                        return customer;
                      } else return null;
                    })
  }

  setPayments( customerid: string, source: any ){

    return this.http.post( this.baseURL + '/sources', { customerid, source } )
                    .map((res)=>{
                      ;
                      return res;
                    })
  }

  setDefaultPayments( customerid: string, source: any ){

    return this.http.post( this.baseURL + '/default_source', { customerid, source } )
                    .map((res)=>{
                      ;
                      return res;
                    })
  }

  setSubscription( planid: number ){

    return this.http.post( this.baseURL + '/subscription', { planid } )
                    .map((res)=>{
                      ;
                      return res;
                    })
  }

  setCoupon( coupon: number ){
    return this.http.post( this.baseURL + '/coupon', { coupon } )
                    .map((res)=>{
                      ;
                      return res;
                    })
  }

}
