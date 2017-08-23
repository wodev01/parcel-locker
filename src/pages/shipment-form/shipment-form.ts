import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";
import {ShipmentProvider} from "../../providers/shipment/shipment";
import {ShipmentListPage} from "../shipment-list/shipment-list";

/**
 * Generated class for the ShipmentFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shipment-form',
  templateUrl: 'shipment-form.html',
})
export class ShipmentFormPage {
  public shipmentObj: any = {
    label: null,
    size: null,
    sender: null,
    receiver: {
      name: null,
      email: null,
      phone: null
    }
  };
  public userArr: any = [];
  isLoading: boolean = false;
  private loading: any;
  private toast: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth: AuthProvider,
              private shipmentService: ShipmentProvider,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private storage: Storage,
              private userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShipmentFormPage');
    this.fnGetUsers();

    let d = new Date();
    let n = d.getTime();
    this.shipmentObj.label = n.toString(32).toUpperCase()
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

  fnGetUsers() {
    this.isLoading = true;
    if (this.toast) {
      this.toast.dismiss();
    }

    this.userService.getUsers()
      .subscribe(
        data => {
          this.isLoading = false;
          this.userArr = data;
          console.log('this.userArr ', this.userArr)
        },
        error => {
          console.error("User not getting");
          this.presentToast(error.message, 'toast-error');
          this.isLoading = false;
        });
  }

  fnCreateShipment(shipmentObj) {
    this.presentLoadingDefault();
    if (this.toast) {
      this.toast.dismiss();
    }

    let createObj = JSON.parse(JSON.stringify(shipmentObj));
    createObj.sender = {
      firstName: null,
      lastName: null,
      email: null,
      phone: null
    };

    console.log('shipmentObj', shipmentObj);
    createObj.receiverEmail = shipmentObj.receiver.email;
    createObj.receiverPhone = shipmentObj.receiver.phone;
    createObj.userId = shipmentObj.sender._id;
    createObj.dropCode = shipmentObj.sender.code;
    createObj.status = "In Transit";
    createObj.sender.firstName = shipmentObj.sender.firstName;
    createObj.sender.lastName = shipmentObj.sender.lastName;
    createObj.sender.email = shipmentObj.sender.email;
    createObj.sender.phone = shipmentObj.sender.phone;


    this.shipmentService.createShipment(createObj)
      .subscribe(
        data => {
          this.loading.dismiss();
          this.presentToast('Shipment successfully create.', 'toast-info');
          this.navCtrl.pop();
          this.navCtrl.push(ShipmentListPage);
        }, error => {
          this.loading.dismiss();
          this.presentToast('Shipment not create. : ' + error.message, 'toast-error');
        }
      )
  }

  fnLogOut() {
    this.auth.logout()
      .subscribe(
        data => {
          this.storage.remove('AUTH_TOKEN');
          this.storage.remove('LOGIN_USER');
          this.navCtrl.popToRoot()
        },
        error => {
          console.log(error)
        });
  }
}
