import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ThanksPage} from "../thanks/thanks";

/**
 * Generated class for the SlotPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slot',
  templateUrl: 'slot.html',
})
export class SlotPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlotPage');
  }

  fnAllowcateSlot() {
    this.navCtrl.push(ThanksPage);
  }


}
