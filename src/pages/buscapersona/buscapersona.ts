import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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
    imagen:"http://inventario3.aerogal.dev/img/user2-160x160.jpg",
    cargo: "Especialista de soporte en sitio",
    ext: "1045"
}
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  onInput(){
    console.log('Click onInput');
    if(this.myInput.length > 5){

    }
  }

  onCancel(){
    console.log('Click onCancel');
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscapersonaPage');
  }



}
