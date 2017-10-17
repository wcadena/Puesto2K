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
  };

  items:any;

  constructor(
    public navCtrl: NavController,
    private _con:ConnectorProvider
  ) {
    this.items = [
      {title: 'item1',id: '1'},
      {title: 'item2',id: '2'},
      {title: 'item3',id: '3'},
      {title: 'item4',id: '4'},
      {title: 'item5',id: '5'},
      {title: 'item6',id: '6'}
    ];
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
