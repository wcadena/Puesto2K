import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  todo = {
    pais: '',
    ciudad: '',
    direccion: '',
    documentoIdentificacion: '',
    cargo: '',
    compania: '',
    telefono: '',
    nombre_responsable: '',
    area_piso: '',
    email: '',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  logForm() {
    console.log(this.todo)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
