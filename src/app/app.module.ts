import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AlertController, IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { IngresoPage, HomePage, LoginPage,MapaPage,MensagePage,SalidaPage,RegisterPage,ImagenPage,BuscapersonaPage,SubePage } from '../pages/index.paginas';

import { BarcodeScanner  } from '@ionic-native/barcode-scanner';
import { PuestoProvider } from '../providers/puesto/puesto';
import { HttpModule } from '@angular/http';
import { ConnectorProvider } from '../providers/connector/connector';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { MapaProvider } from '../providers/mapa/mapa';
import { AgmCoreModule } from '@agm/core';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';

@NgModule({
  declarations: [
    MyApp,
    IngresoPage, HomePage, LoginPage,MapaPage,MensagePage,SalidaPage, RegisterPage,ImagenPage,BuscapersonaPage,SubePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC5EbqGuS_Vnn_LemMkFXirQMGL1ln7S8A'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IngresoPage, HomePage, LoginPage,MapaPage,MensagePage,SalidaPage,RegisterPage,ImagenPage,BuscapersonaPage,SubePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    AlertController,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PuestoProvider,
    ConnectorProvider,
    MapaProvider,
    Camera,
    ImagePicker,
    FileTransfer,
    File,
    Transfer
  ]
})
export class AppModule {}
