import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the PickupFromSlotPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickup-from-slot',
  templateUrl: 'pickup-from-slot.html',
})
export class PickupFromSlotPage {
  private slot: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('SLOT').then((val) => {
      this.slot = JSON.parse(val);
    });
  }

  fnZeroFill(value, padding) {
    const zeroes = new Array(padding + 1).join('0');
    return (zeroes + value).slice(-padding);
  }

  fnFinish() {
    this.navCtrl.popToRoot()
  }

}
