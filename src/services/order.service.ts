import { Injectable }                              from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable }                              from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Order } from '../models/order';

@Injectable()
export class OrderService {

    constructor(private http: Http) {
    }

    public getList(): Observable<Order[]> {
        return this.http.get("http://192.168.2.105:3000/api/list-orders")
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || error + 'Server error'));
    }

    create(order: Order): Observable<Order> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post("http://192.168.2.105:3000/api/order", order, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }   

    public update(order: Order): Observable<Order> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`http://192.168.2.105:3000/api/order/${order._id}`, order, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }   
}