import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Topping } from '../models/topping';

/**
 * A service for dealing with toppings.
 */
@Injectable()
export class ToppingService {

    /**
     * Injects the http service into this service.
     */
    constructor(private http: Http) {
    }

    /**
     * Retrieves a list of toppings from the API.
     */
    public getList(): Observable<Topping[]> {
        return this.http.get("http://192.168.2.105:3000/api/topping")
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || error + 'Server error'));
    }
}