import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Pizza } from '../models/pizza';

import { API_URL } from '../config.ts';

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
        return this.http.get(API_URL + "/api/product")
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || error + 'Server error'));
    }
}