import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {AlertController, IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { IngresoPage, HomePage, LoginPage,MapaPage,MensagePage,SalidaPage } from '../pages/index.paginas';

import { BarcodeScanner  } from '@ionic-native/barcode-scanner';
import { PuestoProvider } from '../providers/puesto/puesto';
import {HttpModule} from '@angular/http';
import { ConnectorProvider } from '../providers/connector/connector';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    IngresoPage, HomePage, LoginPage,MapaPage,MensagePage,SalidaPage
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
    IngresoPage, HomePage, LoginPage,MapaPage,MensagePage,SalidaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    AlertController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PuestoProvider,
    ConnectorProvider
  ]
})
export class AppModule {}
