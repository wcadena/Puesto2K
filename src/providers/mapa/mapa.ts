import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation} from "@ionic-native/geolocation";


@Injectable()
export class MapaProvider {

  public watch:any;

  public posicion = { latitude: 0, longitude:0 };
  constructor(public http: Http,
              private geolocation: Geolocation) {
    console.log('Hello MapaProvider Provider');
  }
  monitor_geolocalizacion(){
    this.watch = this.geolocation.watchPosition();
    /*this.watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      this.posicion.latitude = data.coords.longitude;
      this.posicion.longitude = data.coords.latitude;
      console.log(data);
      return this.posicion;
    });*/
  }

  dar_geolocalizacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.posicion.latitude = resp.coords.longitude;
      this.posicion.longitude = resp.coords.latitude;
      console.log(resp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  detener_watch(){
    this.watch.unsubscribe();
  }


}
