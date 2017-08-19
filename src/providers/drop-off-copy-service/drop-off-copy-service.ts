import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
 Generated class for the DropOffCopyServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class DropOffCopyServiceProvider {

  constructor(public http: Http,
              private storage: Storage) {
  }

  getApiToken(): Observable<Headers> {
    return Observable.fromPromise(this.storage.get('AUTH_TOKEN'));
  }

  updateSlot(slotId): Observable<any> {
    const headers = new Headers();
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Bearer ' + data);
      return this.http
        .put('http://ec2-34-231-237-69.compute-1.amazonaws.com:3000/api/slots/' + slotId + '/allocate', null, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    })
  }

}
