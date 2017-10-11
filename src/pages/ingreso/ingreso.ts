import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { PuestoProvider } from "../../providers/puesto/puesto";
import { ConnectorProvider } from "../../providers/connector/connector";
import {CustodioData} from "../../models/custodios.model";
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
  public data:any;
  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private _ps:PuestoProvider,
    private _con:ConnectorProvider
            ) {
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
     }, (error) => {
      console.log('An error occurred');
     });
  }
  salir(){
    /* this.data = this._con.ConsultaGet("http://inventario3.aerogal.dev/api/custodiosCedula?documentoIdentificacion=1718097080");
    var usuario_sistema : CustodioData;
    this.data.then((value) => {
      usuario_sistema = value.data;
      console.log(usuario_sistema);

      //this._con.guardar_en_storage('CustodioData',usuario_sistema);
    });

    var dataReco = this._con.cargar_del_storage('CustodioData');
    console.log(dataReco);*/
    this._con.logout();
  }

}
