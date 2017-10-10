import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastController } from 'ionic-angular';
import { ConnectorProvider } from '../providers/connector/connector';
import { IngresoPage, LoginPage } from '../pages/index.paginas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IngresoPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private toastCtrl: ToastController,
    private _us:ConnectorProvider) {
    platform.ready().then(() => {
      //splashScreen.show();
       this._us.cargar_storage()
         .then(()=>{
           if(this._us.currentUser == null){
             this.rootPage = LoginPage;
           }else if(this._us.currentUser.token_type != null){
             //this._us_srv.currentUser= this._us.currentUser;
             console.log("dato a cargar");
             /*this._us_srv.load()
             .then(()=>{
               console.log("/////////////////////////////////////////////////////");
               console.log(this._us_srv.data);
             });/*** /

             this._us_srv.loadUser(this._us.currentUser.email)
             .then(()=>{
               console.log("=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>");
               console.log(this._us_srv.data);
             });
             /**/

             //this.logUser=this._us.currentUser;
             //this.presentToast("Bienvenido: "+this._us.currentUser.email);
             this.presentToast("Bienvenido: Wagner Cadena");
             this.rootPage = IngresoPage;
           }else{
             this.rootPage = LoginPage;
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
}

