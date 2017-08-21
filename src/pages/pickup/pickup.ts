import {Component} from '@angular/core';
import {IonicPage, ToastController, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {PickupServiceProvider} from "../../providers/pickup-service/pickup-service";
import {PickupFromSlotPage} from "../pickup-from-slot/pickup-from-slot";

@IonicPage()
@Component({
  selector: 'page-pickup',
  templateUrl: 'pickup.html',
})
export class PickupPage {
  public pickup: any = {
    code: ''
  };
  public isCodeChecking = false;
  private loading: any;
  private toast: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public pickupService: PickupServiceProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private storage: Storage) {
  }

  presentToast(msg, className) {
    this.toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Close',
      cssClass: className
    });

    this.toast.present();
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...  Sending API call with pickup code for check pickup code in shipment database'
    });
    this.loading.present();
  }

  fnPickup(pickupCode) {
    this.isCodeChecking = true;
    this.presentLoadingDefault();
    if (this.toast) {
      this.toast.dismiss();
    }
    console.info('%c Sending API call with drop off code for check Drop Off code in database', 'background: #2B65EC; color: #ffffff');
    this.pickupService.checkPickup(pickupCode)
      .subscribe(
        data => {
          this.storage.set('AUTH_TOKEN', data.token);
          this.storage.set('SLOT', JSON.stringify(data.slot));
          this.isCodeChecking = false;
          this.loading.dismiss();
          console.info('%c Pickup code successfully Found and Door open for pick up, slot state changed into AVAILABLE', 'background: #2B65EC; color: #ffffff');
          this.presentToast('Pickup code successfully Found and Door open for pick up, slot state changed into AVAILABLE', 'toast-info');
          this.navCtrl.push(PickupFromSlotPage);
        },
        error => {
          console.error("Drop off code not Found");
          this.presentToast(error.message, 'toast-error');
          this.isCodeChecking = false;
          this.loading.dismiss();
        });

  }

}

