import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the ThanksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thanks',
  templateUrl: 'thanks.html',
})
export class ThanksPage {
  pickupCode: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('pickup').then((val) => {
      this.pickupCode = val;
    });
  }

  fnFinish() {
    this.navCtrl.popToRoot()
  }

}
