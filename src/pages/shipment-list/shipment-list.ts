import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, Navbar, NavParams, ToastController} from 'ionic-angular';
import {ShipmentFormPage} from "../shipment-form/shipment-form";
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from '@ionic/storage';
import {ShipmentProvider} from "../../providers/shipment/shipment";
import {HomePage} from "../home/home";

/**
 * Generated class for the ShipmentListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shipment-list',
  templateUrl: 'shipment-list.html',
})
export class ShipmentListPage {
  @ViewChild(Navbar) navBar: Navbar;
  public shipmentArr: any = [];
  isLoading: boolean = false;
  private loading: any;
  private toast: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth: AuthProvider,
              private storage: Storage,
              private shipmentService: ShipmentProvider,
              private toastCtrl: ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShipmentListPage');
    this.fnGetShipments();
    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
      this.navCtrl.push(HomePage);
    };
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

  fnGoTo() {
    this.navCtrl.push(ShipmentFormPage);
  }



  fnGetShipments() {
    this.isLoading = true;
    if (this.toast) {
      this.toast.dismiss();
    }

    this.shipmentService.getShipments()
      .subscribe(
        data => {
          this.isLoading = false;
          this.shipmentArr = data;
        },
        error => {
          console.error("Shipment not getting");
          console.log(error)
          this.presentToast(error.message, 'toast-error');
          this.isLoading = false;
        });
  }


  fnLogOut() {
    this.storage.remove('AUTH_TOKEN');
    this.storage.remove('LOGIN_USER');
    this.auth.logout()
      .subscribe(
        data => {
          this.navCtrl.popToRoot()
        },
        error => {
          console.log(error)
        });
  }

}
