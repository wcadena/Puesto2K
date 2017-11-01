import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {URL_SERVICIOS_PROD} from "../../config/url.servicios";
import {ConnectorProvider} from "../../providers/connector/connector";


/**
 * Generated class for the BuscapersonaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscapersona',
  templateUrl: 'buscapersona.html',
})
export class BuscapersonaPage {

  myInput:any = {
    nombre:"Wagner Cadena",
    imagen: URL_SERVICIOS_PROD + "/img/user2-160x160.jpg",
    cargo: "Especialista de soporte en sitio",
    ext: "1045",
    mapa: URL_SERVICIOS_PROD + "/img/perfil/BVP7GgSAGD2kCtpXZNZgTjWOowHTpe2RIfsvBkme.png",
}
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _con:ConnectorProvider
  ) {
  }
  onInput(){
    console.log('Click onInput');
    if(this.myInput.length > 5){

    }
  }

  onCancel(){
    console.log('Click onCancel');
  }

  buscar(){
    console.log("Buscar");
    let url = "http://inventario3.aerogal.dev/api/custodiosBuscar?nombre_completo="+ this.myInput.nombre ;
    var conecta = this._con.ConsultaGet(url);
    conecta.then((value) => {
      console.log(value);

    }).catch((err) => {
      console.error(err);
      this._con.ErrorToast(err);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscapersonaPage');
  }



}
