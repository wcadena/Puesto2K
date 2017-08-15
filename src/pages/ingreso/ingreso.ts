import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the IngresoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingreso',
  templateUrl: 'ingreso.html',
})
export class IngresoPage {

  registerCredentials = { documentoIdentificacion: '', codigo: '' };

  constructor(platform: Platform,public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresoPage');
  }
  enviaEvento() {
    console.log('enviaEvento');
    console.log(this.registerCredentials.documentoIdentificacion);
    console.log(this.registerCredentials.codigo);
  }
  scanner() {
    console.log('scanner');
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('Success! Barcode data is here');
     }, (err) => {
      console.log('An error occurred');
     });
  }

}
