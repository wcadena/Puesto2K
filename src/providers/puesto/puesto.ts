import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ConnectorProvider} from "../connector/connector";

/*
  Generated class for the PuestoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PuestoProvider {

  constructor(public http: Http,
  private _con:ConnectorProvider) {
    this._con.presentToast('Hello PuestoProvider Provider');
  }

}
