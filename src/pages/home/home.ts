import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DropOffPage} from "../drop-off/drop-off";
import {PickupPage} from "../pickup/pickup";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private storage: Storage) {

  }

  ionViewDidLoad() {
    this.storage.remove('SLOT');
  }

  fnGoTo(page) {
    if (page === 'dropOff') {
      this.navCtrl.push(DropOffPage);
    } else {
      this.navCtrl.push(PickupPage);
    }
  }
}
