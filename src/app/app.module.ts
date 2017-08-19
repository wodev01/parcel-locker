import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { HttpModule } from '@angular/http';
import { IonicStorageModule  } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {DropOffPage} from "../pages/drop-off/drop-off";
import {DropScanLabelPage} from "../pages/drop-scan-label/drop-scan-label";
import {SlotPage} from "../pages/slot/slot";
import {ThanksPage} from "../pages/thanks/thanks";
import { DropOffCopyServiceProvider } from '../providers/drop-off-copy-service/drop-off-copy-service';
import { DropScanLabelServiceProvider } from '../providers/drop-scan-label-service/drop-scan-label-service';
import { DropOffServiceProvider } from '../providers/drop-off-service/drop-off-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DropOffPage,
    DropScanLabelPage,
    SlotPage,
    ThanksPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DropOffPage,
    DropScanLabelPage,
    SlotPage,
    ThanksPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DropOffCopyServiceProvider,
    DropScanLabelServiceProvider,
    DropOffServiceProvider
  ]
})
export class AppModule {}
