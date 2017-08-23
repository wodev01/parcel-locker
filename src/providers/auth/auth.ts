import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {ENV} from "../../config";

@Injectable()
export class AuthProvider {

  constructor(public http: Http,
              private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  checkUserLogin(): Observable<Headers> {
    return Observable.fromPromise(this.storage.get('LOGIN_USER'));
  }

  login(userObj): Observable<any> {
    return this.http
      .post(ENV.API_URL + '/api/auth/login', userObj)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  logout(): Observable<any> {
    return this.http
      .get(ENV.API_URL + '/api/auth/logout')
      .map((response: Response) => response)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
