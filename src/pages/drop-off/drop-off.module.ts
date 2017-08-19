import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DropOffPage } from './drop-off';

@NgModule({
  declarations: [
    DropOffPage,
  ],
  imports: [
    IonicPageModule.forChild(DropOffPage),
  ],
})
export class DropOffPageModule {}
