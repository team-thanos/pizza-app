import { Injectable } from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Store }  from '../models/store';

@Injectable()
export class StoreService {

    constructor(private http: Http) {
    }

    public getList(): Observable<Store[]> {
        return this.http.get("http://192.168.2.105:3000/api/store")
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || error + 'Server error'));
    }

    public deleteStore(store: Store): StoreService {
        return this;
    }
}