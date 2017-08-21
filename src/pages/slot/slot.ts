import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ThanksPage} from "../thanks/thanks";
import {DropOffCopyServiceProvider} from "../../providers/drop-off-copy-service/drop-off-copy-service";


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
  private slot: any = {};
  private isCodeChecking = false;
  private loading: any;
  private toast: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dropOffCopyService: DropOffCopyServiceProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
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
      content: 'Please wait... Sending API call with slot id for Slot allocation'
    });
    this.loading.present();
  }

  fnAllocateSlot(slot) {
    this.isCodeChecking = true;
    this.presentLoadingDefault();
    if (this.toast) {
      this.toast.dismiss();
    }
    console.info('%c Sending API call with slot id for Slot allocation', 'background: #2B65EC; color: #ffffff');
    if (slot._id) {
      this.dropOffCopyService.updateSlot(slot)
        .subscribe(
          data => {
            this.isCodeChecking = false;
            this.loading.dismiss();
            console.info('%c Slot ' + this.slot.slotNumber + ' Allocate and available slot number decrease in location', 'background: #2B65EC; color: #ffffff');
            this.presentToast('Slot ' + this.slot.slotNumber + ' Allocate and available slot number decrease in location', 'toast-info');
            console.log(data)
            this.storage.set('pickup', data.shipment.pickupCode);
            this.navCtrl.push(ThanksPage);
          },
          error => {
            console.error("Issue with Slot Allocation API");
            this.presentToast(error.message, 'toast-error');
            this.isCodeChecking = false;
            this.loading.dismiss();
          });
    }
  }

  fnCancelSlot() {
    this.storage.remove('SLOT');
    this.navCtrl.pop();
  }
}
