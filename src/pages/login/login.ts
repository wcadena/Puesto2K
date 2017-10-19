import { Component } from '@angular/core';
import {AlertController,  Loading, LoadingController, NavController} from 'ionic-angular';
import {UserData} from "../../models/user.model";
import { ConnectorProvider } from "../../providers/connector/connector";

import {IngresoPage} from "../ingreso/ingreso";

import { URL_SERVICIOS_PROD } from '../../config/url.servicios';
import {RegisterPage} from "../register/register";
import {MyApp} from "../../app/app.component";


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
  public currentUser: UserData;
  loading: Loading;
  menuD:boolean;
  registerCredentials = { cedula: '1718097080' };



  constructor(
    private nav: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private _con:ConnectorProvider,

  ) {
    //declara la pagina a dondedebe ir
    this.homepage =MyApp;

  }

  createAccount() {
    this.nav.push(RegisterPage);
  }


  /**
   * evento de login desde la form
   */
  public login() {
    this.showLoading();
    var conecta = this._con.ConsultaGet(URL_SERVICIOS_PROD + 'api/custodiosCedula?documentoIdentificacion=' + this.registerCredentials.cedula);

    conecta.then((value) => {

      this.currentUser = new UserData(localStorage.getItem(this.registerCredentials.cedula));
      this._con.currentUser = new UserData(localStorage.getItem(this.registerCredentials.cedula));
      this._con.guardar_storage(this.registerCredentials.cedula);
      this._con.guardar_en_storage('CustodioData',value);
      this.menuD = true;
      this.nav.setRoot(this.homepage);
     }).catch((err) => {
      console.error(err);
      this.showError(err);
    });


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
