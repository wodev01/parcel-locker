import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/*
  Generated class for the DropOffServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DropOffServiceProvider {

  constructor(public http: Http) {
    console.log('Hello DropOffServiceProvider Provider');
  }

  checkDropOffCode(code): Observable<any> {
    return this.http
      .post('http://ec2-34-231-237-69.compute-1.amazonaws.com:3000/api/drop-off/scan-code', code)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
