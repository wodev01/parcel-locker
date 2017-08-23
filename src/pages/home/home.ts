import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DropOffPage} from "../drop-off/drop-off";
import {PickupPage} from "../pickup/pickup";
import {Storage} from '@ionic/storage';
import {LoginPage} from "../login/login";
import {AuthProvider} from "../../providers/auth/auth";
import {ShipmentListPage} from "../shipment-list/shipment-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loginUser: any = null;

  constructor(public navCtrl: NavController,
              private auth: AuthProvider,
              private storage: Storage) {

  }

  ionViewDidLoad() {
    this.storage.remove('SLOT');
  }

  fnGoTo(page) {
    switch (page) {
      case 'dropOff':
        this.navCtrl.push(DropOffPage);
        break;
      case 'pickup':
        this.navCtrl.push(PickupPage);
        break;
      case 'admin':

        this.auth.checkUserLogin()
          .subscribe(
            data => {
              console.log('data', data);
              this.loginUser = data;
              if( this.loginUser) {
                this.navCtrl.push(ShipmentListPage);
              }else{
                this.navCtrl.push(LoginPage);
              }
            },
            error => {
              this.navCtrl.push(LoginPage);
            });
    }
  }
}
