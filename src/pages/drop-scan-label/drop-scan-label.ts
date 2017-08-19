import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SlotPage} from "../slot/slot";
import {DropScanLabelServiceProvider} from "../../providers/drop-scan-label-service/drop-scan-label-service";

/**
 * Generated class for the DropScanLabelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drop-scan-label',
  templateUrl: 'drop-scan-label.html',
})
export class DropScanLabelPage {
  scanLabel: any = {
    code: null
  };
  isCodeChecking = false;
  private loading: any;
  private toast: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private scanLabelService: DropScanLabelServiceProvider,
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
      content: 'Please wait...'
    });

    this.loading.present();
  }

  fnCheckScanCode(scanLabelCode) {
    this.isCodeChecking = true;
    this.presentLoadingDefault();
    if (this.toast) {
      this.toast.dismiss();
    }
    console.info('%c Sending API call with scan label code for check parcel is available with scan label in database', 'background: #2B65EC; color: #ffffff');
    this.scanLabelService.getLabel(scanLabelCode)
      .subscribe(
        data => {
          this.storage.set('SLOT', JSON.stringify(data.slot));
          console.info('%c Scan code successfully check and Slot ' + data.slot.slotNumber + 'Found and Store slot information', 'background: #2B65EC; color: #ffffff');
          this.isCodeChecking = false;
          this.loading.dismiss();
          console.info('%c Door Open for slot ' + data.slot.slotNumber + '.', 'background: #2B65EC; color: #ffffff');
          this.navCtrl.push(SlotPage);
        },
        error => {
          console.error("Scan code not Found");
          this.presentToast(error.message, 'toast-error');
          this.isCodeChecking = false;
          this.loading.dismiss();
        });


  }

}
