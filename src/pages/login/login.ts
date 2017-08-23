import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AuthProvider} from "../../providers/auth/auth";
import {ShipmentListPage} from "../shipment-list/shipment-list";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginObj: object = {
    email: null,
    password: null
  };
  private loading: any;
  private toast: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private storage: Storage,
              private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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

  fnLogin(loginObj) {
    this.presentLoadingDefault();
    if (this.toast) {
      this.toast.dismiss();
    }

    this.auth.login(loginObj)
      .subscribe(
        data => {
          this.storage.set('AUTH_TOKEN', data.token);
          this.storage.set('LOGIN_USER', data.user);
          this.loading.dismiss();
          this.navCtrl.push(ShipmentListPage);
        },
        error => {
          this.presentToast(error.message, 'toast-error');
          this.loading.dismiss();
        });
  }

}
