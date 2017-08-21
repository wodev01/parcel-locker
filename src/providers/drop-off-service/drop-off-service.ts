import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {ENV} from "../../config";


/*
 Generated class for the DropOffServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class DropOffServiceProvider {

  constructor(public http: Http) {
  }

  checkDropOffCode(code): Observable<any> {
    return this.http
      .post(ENV.API_URL + '/api/drop-off/scan-code', code)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
