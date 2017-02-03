import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Topping } from '../models/topping';

@Injectable()
export class ToppingService {

    constructor(private http: Http) {
    }

    public getList(): Observable<Topping[]> {
        return this.http.get("http://192.168.2.105:3000/api/topping")
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || error + 'Server error'));
    }
}