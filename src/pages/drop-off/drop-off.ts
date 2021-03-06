import {Component} from '@angular/core';
import {IonicPage, ToastController, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {DropScanLabelPage} from "../drop-scan-label/drop-scan-label";
import {DropOffServiceProvider} from "../../providers/drop-off-service/drop-off-service";

@IonicPage()
@Component({
  selector: 'page-drop-off',
  templateUrl: 'drop-off.html',
})
export class DropOffPage {
  public dropOff: any = {
    code: ''
  };
  public isCodeChecking = false;
  private loading: any;
  private toast: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dropOffService: DropOffServiceProvider,
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
      content: 'Please wait...  Sending API call with drop off code for check Drop Off code in database'
    });
    this.loading.present();
  }

  fnCheckDropOffCode(dropOffCode) {
    this.isCodeChecking = true;
    this.presentLoadingDefault();
    if (this.toast) {
      this.toast.dismiss();
    }
    console.info('%c Sending API call with drop off code for check Drop Off code in database', 'background: #2B65EC; color: #ffffff');
    this.dropOffService.checkDropOffCode(dropOffCode)
      .subscribe(
        data => {
          this.storage.set('AUTH_TOKEN', data.token);
          this.isCodeChecking = false;
          this.loading.dismiss();
          console.info('%c Drop off code successfully Found and create auth token', 'background: #2B65EC; color: #ffffff');
          this.presentToast('Drop off code successfully Found and create auth token', 'toast-info');
          this.navCtrl.push(DropScanLabelPage);
        },
        error => {
          console.error("Drop off code not Found");
          this.presentToast(error.message, 'toast-error');
          this.isCodeChecking = false;
          this.loading.dismiss();
        });

  }

}
