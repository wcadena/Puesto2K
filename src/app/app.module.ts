import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {IngresoPage} from '../pages/ingreso/ingreso';
import { BarcodeScanner  } from '@ionic-native/barcode-scanner';
import { PuestoProvider } from '../providers/puesto/puesto';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IngresoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IngresoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PuestoProvider
  ]
})
export class AppModule {}
