import { Injectable } from '@angular/core';
import { AppHttp } from '../helpers/http/AppHttp.service';
import { Customer } from './customer.model';
import { CustomerSource } from './customer-source.model';

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

												console.log(res);

												return customer;
											} else return null;
										})
	}

	setPayments( customerid: string, source: any ){
		console.log( { customerid, source } );
		return this.http.post( this.baseURL + '/sources', { customerid, source } )
										.map((res)=>{
											console.log("setPayments", res);
											return res;
										})
	}

	setDefaultPayments( customerid: string, source: any ){

		return this.http.post( this.baseURL + '/default_source', { customerid, source } )
										.map((res)=>{
											console.log("setDefaultPayments", res);
											return res;
										})
	}

	setSubscription( planid: number ){

		return this.http.post( this.baseURL + '/subscription', { planid } )
										.map((res)=>{
											console.log("setSubscription", res);
											return res;
										})
	}

	setCoupon( coupon: number ){
		return this.http.post( this.baseURL + '/coupon', { coupon } )
										.map((res)=>{
											console.log("setCoupon", res);
											return res;
										})
	}

}
