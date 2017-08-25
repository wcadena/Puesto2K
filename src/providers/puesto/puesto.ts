import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {URL_SERVICIOS} from "../../config/url.servicios";

/*
  Generated class for the PuestoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PuestoProvider {

  constructor(public http: Http) {
    console.log('Hello PuestoProvider Provider');
  }
  public enviar_datos(cedula:String,codigo:String, horas:number){
      let url = URL_SERVICIOS + "api/puesto_asigna?documentoIdentificacion="+cedula+"&codigo="+codigo+"&horas="+horas;
      this.http.get(url)
        .map(resp => resp.json())
        .subscribe( data =>{
            console.log(data);
        });

  }

}
