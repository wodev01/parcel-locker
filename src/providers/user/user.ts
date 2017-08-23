import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {ENV} from "../../config";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http,
              private storage: Storage) {
    console.log('Hello UserProvider Provider');
  }

  getApiToken(): Observable<Headers> {
    return Observable.fromPromise(this.storage.get('AUTH_TOKEN'));
  }


  getUsers(): Observable<any> {
    const headers = new Headers();
    // this.createAuthorizationHeader(headers);
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Bearer ' + data);
      return this.http
        .get(ENV.API_URL + '/api/users', {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    });

  }

}
