import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Store } from '../models/store';

import { API_URL } from '../config.ts';

/**
 * A service for dealing with stores.
 */
@Injectable()
export class StoreService {

    /**
     * Injects the http service into this service.
     */
    constructor(private http: Http) {
    }

    /**
     * Retrieves a list of stores from the API.
     */
    public getList(): Observable<Store[]> {
        return this.http.get(API_URL + "/api/store")
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || error + 'Server error'));
    }
}