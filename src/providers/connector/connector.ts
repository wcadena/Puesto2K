import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import { ToastController , Platform} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AUTHORIZATION_BEARER, URL_SERVICIOS_PROD, DEBUG } from '../../config/url.servicios';
import {UserData} from "../../models/user.model";


/*
  Generated class for the ConnectorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConnectorProvider {

  public currentUser: UserData;
  private http: any;
  public data: any;

  constructor(
    private storage:Storage,
    private platform: Platform,
    private iab: InAppBrowser,
    private toastCtrl: ToastController,
    http: Http) {
    this.http = http;
    console.log('Hello ConnectorProvider Provider');
  }



  /**
   * para solicitar una respuesta desde el json con autenticacion Bearer,
   * devuelve como un Objeto
   * para usar :
   * var cast = ConsultaGet(URL);
   * cast.then(function(value) {
   *   console.log(value);
   * });
   *
   * O PUEDE USAR:
   *
   * var p1 = Promise.resolve({
   *   then: function(onFulfill, onReject) { onFulfill('fulfilled!'); }
   * });
   * p1.then((v) => {
   *     console.log(v); // "fulfilled!"
   *   }, function(e) {
   *     // not called
   * });
   * o usar
   *  var conecta = this._con.ConsultaGet(URL);
   *    conecta.then((value) => {
   *  this.nav.setRoot(this.homepage);
   *  }).catch((err) => {
   *       console.error(err);
   *       this.showError(err);
   *  });
   *
   * @param url poner url mas datos con ?dato=datp&dato2=dato2&dat3=dat3
   * @returns {Promise<T>}
   * @constructor
   */
  public ConsultaGet(url:string){
    let promesa= new Promise((resolve,reject ) =>{
      //let url_tok =URL_TOKEN;
      let url_tok = url;
      this.http.get(url_tok,{ headers: {
        Authorization: 'Bearer ' + AUTHORIZATION_BEARER } })
        .subscribe(res => {
          this.data = res.json();
          resolve(this.data);
        }, error => {
          this.presentToast(error);
          this.ErrorToast( JSON.stringify(error)+"");
          console.error(error);
          reject(error);
        });
    });
    return promesa;
  }


  /***
   * lanza de una pagina web
   * @param web
   */
  public lanzarweb(web:string){
    this.iab.create(web);

  }



  /**
   * guarda los datos en el storage del dispositivo o en el computador para realizar pruebas, es asincrono
   * @returns {Promise<T>}
   */
  public guardar_storage(cedula:string){
    let promesa= new Promise((resolve,reject ) =>{
      if(this.platform.is("cordova")){
        //es un dispositivo
        this.storage.set('user', cedula);
        resolve();
      }else{
        //esta en la computadora
        if(this.currentUser){
          localStorage.setItem('user.token_type',cedula);
          resolve();
        }else{
          localStorage.removeItem('user.token_type');
          resolve();
        }
      }
    });
    return promesa;
  }

  /**
   * para guardar en storage de la maquina
   * @param tipo
   * @param dato
   * @returns {Promise<T>}
   */
  public guardar_en_storage(tipo:string,dato:any){
    let promesa= new Promise((resolve,reject ) =>{
      if(this.platform.is("cordova")){
        //es un dispositivo
        this.storage.set(tipo,dato);
        resolve();
      }else{
        //esta en la computadora
        if(this.currentUser){
          localStorage.setItem(tipo, JSON.stringify(dato));
          resolve();
        }else{
          localStorage.removeItem(tipo);
          resolve();
        }
      }
    });
    return promesa;
  }

  /**
   * cargar del storage los datos guardados
   * @param tipo
   * @returns {Promise<T>}
   */
  public cargar_del_storage_objeto(tipo:string){
    let promesa= new Promise((resolve,reject ) =>{
      if(this.platform.is("cordova")){
        //es un dispositivo
        this.storage.ready()
          .then( () =>{
              this.storage.get(tipo).then((val) => {
                this.currentUser = val;
                resolve(this.currentUser);
              });
          });
      }else{
        //esta en la computadora
         //resolve(localStorage.getItem(tipo));
        resolve( JSON.parse(localStorage.getItem(tipo)));
      }
    }).catch((err: any) => {
      this.ErrorToast(err);
      console.error(err);
    });
    return promesa;
  }

  /***
   * carga los datos de memoria listo para ver si es usuario valido o se debe logear
   * @returns {Promise<TResult|T>}
   */
  public cargar_storage(tipo:string){
    let promesa= new Promise((resolve,reject ) =>{
      if(this.platform.is("cordova")){
        //es un dispositivo
        this.storage.ready()
          .then( () =>{
            if(tipo=='user'){
              this.storage.get('user').then((val) => {
                this.currentUser = val;
                resolve(this.currentUser);
              });
            }else{
              resolve(null);
            }
          });
      }else{
        //esta en la computadora
        if(tipo=='user') {
          this.currentUser = new UserData(localStorage.getItem('user.token_type'));
          resolve(this.currentUser);
        }else{
          resolve(null);
        }
      }
    }).catch((err: any) => {
      this.presentToast(err);
    });
    return promesa;
  }

  /**
   * consulta catalogos de usuarios
   */




  /**
   * ejemplo de consulta, no se usa en lugar alguno por el momento
   * @returns {Promise<T>}
   */
  public consultaapiget_clave(){
    console.log("Consulta api login");
    let promesa= new Promise((resolve,reject ) =>{
      //let url_tok =URL_TOKEN;
      let url_tok = URL_SERVICIOS_PROD + "api/users";
      this.http.get(url_tok,{ headers: { Authorization: 'Bearer ' + AUTHORIZATION_BEARER } })
        .subscribe(res => {
          this.data = res.json();
          console.log(this.data);
          //this.guardar_storage()
        }, error => {
          this.presentToast(error);
        });
    });
    return promesa;
  }

  /**
   * salir de aplicacion,borra los datos guardados del login
   * @returns {any}
   */
  public logout() {
    this.currentUser =null;
    this.guardar_storage(null);
  }

  /**
   * lansa un mensaje tost muy discreto
   * @param mensaje
   */
  presentToast(mensaje:string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  ErrorToast(mensaje:string) {
    if(DEBUG){
      let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 9000,
        position: 'middle'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }
  }

}
