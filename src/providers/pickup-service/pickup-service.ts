import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {ENV} from "../../config";

@Injectable()
export class PickupServiceProvider {

  constructor(public http: Http) {
    console.log('Hello PickupServiceProvider Provider');
  }

  checkPickup(code): Observable<any> {
    return this.http
      .post(ENV.API_URL + '/api/pickup/scan-code', code)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
