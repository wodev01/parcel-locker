import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipmentFormPage } from './shipment-form';

@NgModule({
  declarations: [
    ShipmentFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipmentFormPage),
  ],
})
export class ShipmentFormPageModule {}
