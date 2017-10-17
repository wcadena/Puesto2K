import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ConnectorProvider} from "../../providers/connector/connector";
import {URL_SERVICIOS_PROD} from "../../config/url.servicios";

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
    celular:'',
    ext:'',
  };

  empresas:any;
  areas:any;

  constructor(
    public navCtrl: NavController,
    private _con:ConnectorProvider
  ) {
    /**
     * empresas api
     * @type {string}
     */
    let url =URL_SERVICIOS_PROD + 'api/empresas';
    let empresasapi=this._con.ConsultaGet(url);

    empresasapi.then((value) => {

      this.empresas = value['data'];
    }).catch((err) => {
      console.error(err);
    });
    this.areas = [];
    let url2 =URL_SERVICIOS_PROD + 'api/areas?per_page=50';
    this.getArea(url2);
  }

  getArea(url){
    /**
     * areas api
     * @type {string}
     */
    let url2 =url;//URL_SERVICIOS_PROD + 'api/areas?per_page=50';
    let areasasapi=this._con.ConsultaGet(url2);

    areasasapi.then((value) => {
      let datto = value['data'];
      let total_pages = parseInt(value['meta']['pagination']['total_pages']);
      let current_page = parseInt(value['meta']['pagination']['current_page']);
      if( current_page < total_pages ){
        this.getArea(value['meta']['pagination']['links']['next']);
      }
      this.areas = this.areas.concat(datto);
      return ;
    }).catch((err) => {
      console.error(err);
    });
  }

  logForm() {

    var data ="pais="+this.todo.pais+"&"+
    "ciudad="+this.todo.ciudad+"&"+
    "direccion="+this.todo.direccion+"&"+
    "documentoIdentificacion="+this.todo.documentoIdentificacion+"&"+
    "cargo="+this.todo.cargo+"&"+
    "compania="+this.todo.compania+"&"+
    "telefono="+this.todo.telefono+"&"+
    "nombre_responsable="+this.todo.nombre_responsable+"&"+
    "area_piso="+this.todo.area_piso+"&"+
      "celular="+this.todo.celular+"&"+
      "ext="+this.todo.ext+"&"+
    "email="+this.todo.email+"";
    let url = URL_SERVICIOS_PROD + "api/custodios?"+data;

    let post = this._con.PostData(url);
    post.then((value) => {
      console.log(value);
      this.navCtrl.pop();
      }, function(e) {
      console.error(e)
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
