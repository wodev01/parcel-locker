import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DropOffPage} from "../drop-off/drop-off";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  fnGoToDropOff() {
    this.navCtrl.push(DropOffPage);
  }
}
