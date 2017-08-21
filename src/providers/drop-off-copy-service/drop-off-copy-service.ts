import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {ENV} from "../../config";

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

  updateSlot(slot): Observable<any> {
    let slotId = slot._id;
    let shipment = {
      shipmentId: slot.shipmentId
    };
    const headers = new Headers();
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Bearer ' + data);
      return this.http
        .put(ENV.API_URL + '/api/slots/' + slotId + '/allocate', shipment, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    })
  }

}
