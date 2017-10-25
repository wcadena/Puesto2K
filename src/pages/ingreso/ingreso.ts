import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { ConnectorProvider } from "../../providers/connector/connector";
import {CustodioData} from "../../models/custodios.model";
import {LoginPage} from "../login/login";
import {URL_SERVICIOS_PROD} from "../../config/url.servicios";
import {BuscapersonaPage} from "../buscapersona/buscapersona";
import {MapaPage} from "../mapa/mapa";
import {ImagenPage} from "../imagen/imagen";
import {SubePage} from "../sube/sube";
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

  registerCredentials = { documentoIdentificacion: '', codigo: 'asd1', nombre : '' , salida: false, scan: false};
  custodio : CustodioData;
  public data:any;
  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private _con:ConnectorProvider
            ) {
    var data = this._con.cargar_del_storage_objeto('CustodioData');
    data.then((value) => {
      //console.log(value);
      this.custodio = value['data'];
      this.registerCredentials.documentoIdentificacion = this.custodio.documentoIdentificacion;
      this.registerCredentials.nombre = this.custodio.nombre_responsable;
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresoPage');
  }
  enviaEvento() {
    console.log('enviaEvento');
    console.log(this.registerCredentials.documentoIdentificacion);
    console.log(this.registerCredentials.codigo);

    let url = URL_SERVICIOS_PROD + "api/puesto_asigna?documentoIdentificacion="+this.registerCredentials.documentoIdentificacion+
      "&codigo="+this.registerCredentials.codigo+"&horas="+9;
    var conecta = this._con.ConsultaGet(url);
    conecta.then((value) => {
      console.log(value);
      this._con.presentToast("Puesto Asignado, su turno termina a las: "+value['data']['fecha_fin']);
      this.registerCredentials.salida = true;
    }).catch((err) => {
      console.error(err);
      this._con.ErrorToast(err);
    });

  }
  enviaEventoSalida(){

    let url = URL_SERVICIOS_PROD + "api/puesto_liberar?documentoIdentificacion="+this.registerCredentials.documentoIdentificacion+
      "&codigo="+this.registerCredentials.codigo;
    var conecta = this._con.ConsultaGet(url);
    conecta.then((value) => {
      console.log(value);
      this._con.presentToast("Puesto Liberado, "+value['data']);
      this.registerCredentials.salida = false;
    }).catch((err) => {
      console.error(err);
      this._con.ErrorToast(err);
    });
  }
  scanner() {
    this.registerCredentials.scan=true;
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('Success! Barcode data is here');
      console.log(barcodeData.text);
      this.registerCredentials.codigo = barcodeData.text;
     }, (error) => {
      console.log('An error occurred');
     });
  }
  salir(){
    this.navCtrl.setRoot(LoginPage);
    this._con.logout();
  }
  enviarPuesto(){
    console.log("Envia datos");
  }
  buscar(){
    this.navCtrl.push(BuscapersonaPage);
  }

  ir_mapa(){
    //this.navCtrl.push(MapaPage);
    this.navCtrl.push(MapaPage) ;
  }
  ir_imagen(){
    //this.navCtrl.push(MapaPage);
    this.navCtrl.push(ImagenPage) ;
  }
  ir_descargaimagen(){
    //this.navCtrl.push(MapaPage);
    this.navCtrl.push(SubePage) ;
  }

}
