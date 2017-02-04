import { Injectable }                              from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API_URL } from '../config.ts';

/**
 * A service for managing the system.
 */
@Injectable()
export class SystemService {

    /**
     * Injects the http service into this service.
     */
    constructor(private http: Http) {
    }

    /**
     * Initializes the database with new random data.
     */
    public resetDb(): Observable<void> {
        return this.http.get(API_URL + "/api/reset-db")
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || error + 'Server error'));
    }
}