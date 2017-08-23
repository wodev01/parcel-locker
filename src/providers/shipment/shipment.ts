import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {ENV} from "../../config";

@Injectable()
export class ShipmentProvider {

  constructor(public http: Http,
              private storage: Storage) {
  }

  getApiToken(): Observable<Headers> {
    return Observable.fromPromise(this.storage.get('AUTH_TOKEN'));
  }

  getShipments(): Observable<any> {
    const headers = new Headers();
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Bearer ' + data);
      return this.http
        .get(ENV.API_URL + '/api/shipments', {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 401) {
            error._body = {message: 'Please logout and try again'}
          }
          console.log('====',error)
          return Observable.throw(error.json() || 'Server error')
        });
    });
  }

  getShipment(shipmentId): Observable<any> {
    const headers = new Headers();
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Bearer ' + data);
      return this.http
        .get(ENV.API_URL + '/api/shipments/' + shipmentId, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 401) {
            error._body = {message: 'Please logout and try again'}
          }
          return Observable.throw(error.json() || 'Server error')
        });
    });
  }

  createShipment(shipmentObj): Observable<any> {
    const headers = new Headers();
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Bearer ' + data);
      return this.http
        .post(ENV.API_URL + '/api/shipments', shipmentObj, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 401) {
            error._body = {message: 'Please logout and try again'}
          }
          return Observable.throw(error.json() || 'Server error')
        });
    });
  }

  updateShipment(shipmentId, shipmentObj): Observable<any> {
    const headers = new Headers();
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Bearer ' + data);
      return this.http
        .post(ENV.API_URL + '/api/shipments/' + shipmentId, shipmentObj, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 401) {
            error._body = {message: 'Please logout and try again'}
          }
          return Observable.throw(error.json() || 'Server error')
        });
    });
  }

  removeShipment(shipmentId): Observable<any> {
    const headers = new Headers();
    return this.getApiToken().flatMap(data => {
      headers.append('Authorization', 'Bearer ' + data);
      return this.http
        .delete(ENV.API_URL + '/api/shipments/' + shipmentId, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 401) {
            error._body = {message: 'Please logout and try again'}
          }
          return Observable.throw(error.json() || 'Server error')
        });
    });
  }

}
