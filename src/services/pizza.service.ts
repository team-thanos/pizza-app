import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Pizza } from '../models/pizza';

/**
 * A service for dealing with products (pizza).
 */
@Injectable()
export class PizzaService {

    /**
     * Injects the http service into this service.
     */
    constructor(private http: Http) {
    }

    /**
     * Retrieves a list of purchasable products from the API.
     */
    public getList(): Observable<Pizza[]> {
        return this.http.get("http://192.168.2.105:3000/api/product")
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || error + 'Server error'));
    }
}