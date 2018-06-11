import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class PersonService {

    myAppUrl: string = "";
    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }

    getAll() {
        return this._http.get(this.myAppUrl + 'api/Person')
           .map((response: Response) => response.json())
           .catch(this.errorHandler);
    }

    getClosestFriends(id: number) {
        return this._http.get(this.myAppUrl + "api/Person/Friends/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    get(id: number) {
        return this._http.get(this.myAppUrl + "api/Person/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    add(person) {
        return this._http.post(this.myAppUrl + 'api/Person', person)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }


    delete(id) {
        return this._http.delete(this.myAppUrl + "api/Person/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
