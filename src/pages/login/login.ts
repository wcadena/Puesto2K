import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserData} from "../../models/user.model";
import { ConnectorProvider } from "../../providers/connector/connector";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  homepage:any;
  usu_aux: UserData;
  loading: Loading;
  registerCredentials = { email: '', password: '' };


  constructor(private nav: NavController, private auth: ConnectorProvider,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    //declara la pagina a dondedebe ir
    this.homepage =HomePage;

  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }


  /**
   * evento de login desde la form
   */
  public login() {
    this.showLoading()
    /*this.auth.login_auth_services(this.registerCredentials).subscribe(allowed => {
        if (allowed) {//si esta bien ingresa
         /* this.auth.consultaapi_clave2(this.registerCredentials.email,this.registerCredentials.password)
            .then(
              () => {
                this.usu_aux =this.auth.currentUser;
                console.log(this.usu_aux);
                this.auth.guardar_storage();
                this.nav.setRoot(this.homepage);
              });* /

        } else {
          this.showError("Aceso Denegado");
        }
      },
      error => {
        this.showError(error);
      });*/
  }

  /**
   * presenta el mensaje de cargando
   */
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  /**
   * da un mensaje de error
   * @param text
   */
  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
