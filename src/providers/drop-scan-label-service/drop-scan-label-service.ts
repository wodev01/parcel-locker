import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/*
 Generated class for the DropScanLabelServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class DropScanLabelServiceProvider {

  constructor(public http: Http,
              private storage: Storage) {
  }


  getApiToken(): Observable<Headers> {
    return Observable.fromPromise(this.storage.get('AUTH_TOKEN'));
  }


  getLabel(code): Observable<any> {
    const headers = new Headers();
    // this.createAuthorizationHeader(headers);
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Bearer ' + data);
      return this.http
        .post('http://ec2-34-231-237-69.compute-1.amazonaws.com:3000/api/drop-off/scan-label', code, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    });

  }
}
