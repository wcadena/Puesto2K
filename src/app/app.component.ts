import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastController } from 'ionic-angular';
import { ConnectorProvider } from '../providers/connector/connector';
import { IngresoPage, LoginPage, MapaPage } from '../pages/index.paginas';
import {ImagenPage} from "../pages/imagen/imagen";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IngresoPage;
  public menuOpcion = { presentar: false};

  constructor(platform: Platform,

    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private toastCtrl: ToastController,
    private _us:ConnectorProvider) {
    platform.ready().then(() => {
      //splashScreen.show();
       this._us.cargar_storage('user')
         .then(()=>{
           if(this._us.currentUser == null){
             this.rootPage = LoginPage;
           }else if(this._us.currentUser.token_type != null){
             this.presentToast("Bienvenido Usuario "+this._us.currentUser.token_type);
             this.rootPage = IngresoPage;
             this.menuOpcion.presentar = true ;
             //MENU = true;
           }else{
             var log = LoginPage;
             this.rootPage = log;
           };
           statusBar.styleDefault();
           splashScreen.hide();
         }).catch((err: any) => {
         this.presentToast(err+"");
       });
     });
       // Okay, so the platform is ready and our plugins are available.
       // Here you can do any higher level native things you might need.
   }

   /**
    * mensaje de error o de exito
    * @param mensaje
    */
   presentToast(mensaje:string) {
     let toast = this.toastCtrl.create({
       message: mensaje,
       duration: 3000,
       position: 'bottom'
     });
     toast.onDidDismiss(() => {
       //console.log('Dismissed toast');
     });

     toast.present();
   }
   ir_mapa(){
     //this.navCtrl.push(MapaPage);
     this.rootPage = MapaPage;
   }
  ir_imagen(){
    //this.navCtrl.push(MapaPage);
    this.rootPage = ImagenPage;
  }

}

