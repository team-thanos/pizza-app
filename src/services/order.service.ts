import { Injectable }                              from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Order } from '../models/order';

import { API_URL } from '../config.ts';

/**
 * A service for managing orders.
 */
@Injectable()
export class OrderService {

    /**
     * Injects the http service into this service.
     */
    constructor(private http: Http) {
    }

    /**
     * Retrieves the list of all orders from the API.
     */
    public getList(): Observable<Order[]> {
        return this.http.get(API_URL + "/api/list-orders")
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || error + 'Server error'));
    }

    /**
     * Saves a new order to the system.
     */
    create(order: Order): Observable<Order> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(API_URL + "/api/order", order, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * Updates an existing order in the system.
     */
    public update(order: Order): Observable<Order> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(API_URL + `/api/order/${order._id}`, order, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }   
}