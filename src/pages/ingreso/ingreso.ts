import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import {PuestoProvider} from "../../providers/puesto/puesto";
/**
 * Generated class for the IngresoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-ingreso',
  templateUrl: 'ingreso.html',
})
export class IngresoPage {

  registerCredentials = { documentoIdentificacion: '', codigo: '' };

  constructor(platform: Platform,public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner,
              private _ps:PuestoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresoPage');
  }
  enviaEvento() {
    console.log('enviaEvento');
    console.log(this.registerCredentials.documentoIdentificacion);
    console.log(this.registerCredentials.codigo);
    this._ps.enviar_datos(this.registerCredentials.documentoIdentificacion,this.registerCredentials.codigo,6);
  }
  scanner() {
    console.log('scanner');
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('Success! Barcode data is here');
      console.log(barcodeData.text);
      this.registerCredentials.codigo = barcodeData.text;
     }, (err) => {
      console.log('An error occurred');
     });
  }

}
