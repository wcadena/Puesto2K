import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {MapaProvider} from "../../providers/mapa/mapa";

/**
 * Generated class for the MapaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  title: string = 'Mi ubicación';
  lat: number = 51.678418;
  lng: number = 7.809007;

  public posicion = { latitude: 0, longitude:0 };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ubicacion:MapaProvider
  ) {
    this._ubicacion.monitor_geolocalizacion();
    this._ubicacion.watch.subscribe((data) => {
      this.lng = data.coords.longitude;
      this.lat = data.coords.latitude;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

}
