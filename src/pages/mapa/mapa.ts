import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {IngresoPage} from "../ingreso/ingreso";

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

  rootPage:any = IngresoPage;
  private isOn: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getButtonText(): string {
    return `Switch ${ this.isOn ? 'Off' : 'On' }`;
  }
  setState(): void {
    this.isOn = !this.isOn;
  }

  toggleDetails() {
    this.isOn = !this.isOn;
  }
  ir_ingreso() {

    this.navCtrl.setRoot(IngresoPage);
  }

  busqueda(dato:string){
    console.log(dato);
  }
  busquedaCancel(dato:string){
    console.log(dato);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

}
