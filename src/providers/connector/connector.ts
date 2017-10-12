import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import { ToastController , Platform} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AUTHORIZATION_BEARER } from '../../config/url.servicios';
import {UserData} from "../../models/user.model";
import {LoginPage} from "../../pages/login/login";

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
   * devuelve true
   * @param credentials
   * @returns {any}
   */
  public login_auth_services(cedula:string) {
    if (cedula=== null || cedula=== '' ) {
      return Observable.throw("Por favor insertar Cedula");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        observer.next(true);
        observer.next(this.currentUser.token_type);
        observer.complete();
        //this.lanzarweb("http://inventario.ecuatask.com/");

      });
    }
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
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNmMzZjMmI1ZTcxODQxZTE1MDVkOTVjMzk5NGJhYzhkNTM4YTc5YjU0YmJiYWM5NGM4M2M2ZWRmOTkwZDZkYzdmZDY4NDQ5ZmJkOWU4NDhjIn0.eyJhdWQiOiI0IiwianRpIjoiY2YzNmMyYjVlNzE4NDFlMTUwNWQ5NWMzOTk0YmFjOGQ1MzhhNzliNTRiYmJhYzk0YzgzYzZlZGY5OTBkNmRjN2ZkNjg0NDlmYmQ5ZTg0OGMiLCJpYXQiOjE1MDczMjgwNDksIm5iZiI6MTUwNzMyODA0OSwiZXhwIjoxNTM4ODY0MDQ5LCJzdWIiOiIyMyIsInNjb3BlcyI6W119.WxrR7JcdhZOljvi3C8-dvoE7uZBQzDKxTEbtEcCX-X4J6CD-yNPGwoyWtrihyxJ79RxmM580AwVI8f5bl9iWlvDUKzF5WQEdi3140XPnnvgqKJpfClUAT5LtgGfeDdL_wl1idbfaRRamsNhYu04Un0ZnrkH96GZASWgDR79X7LAzoam1its72Rr4Bh7XF7cK8MiW2pDrXxRoyiT2NLyMSi4ubunbxfwXRpRQDrsP8vj8EvUlPuXyHhxVureMFkXj65IXXE-YizusVjmBcIGtvyUoOQD5y0ioj36S1cNB4ugkbSQfTCWfVUDjkPfIHn-ewr59BhsQZKcHM9tI4eakpgqgZginMaN7vpYt8T7s0TSeaxGdTQux59hUQK6MHk8LyK4PfXEbeKHeKETm0Y2LwgG8y4atQi68P_zPrcw2tzhMRaJdCXsDVSqjCuNbVJ_1YG47fn_5IpvaWouVDsvOnfYpNjkI98RhKy_UQX1fI2fSMIrsyBO-HcT3bBnIA1pqjXpRLt19UXmHrPwQqZ30geyGtedtXzMUlUxHSDgqOBCOFFc3c1ve1OAUzKvwov5DC8SNfkiCkiYvM59cDu6A_ccliG-2y8ZPsy730Z3JfFK1Y10UwxHlERaf-Lf1NJyEiOK0e0lxOSlX74U67XRn53oblkCIZa1H_bdhdex32iU' } })
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

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
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
      let url_tok = "http://inventario.ecuatask.com/api/users";
      this.http.get(url_tok,{ headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIxZjE2MjVlMzBjNzBjODI2MzQ2ZjllOTNiYmU2YTMxOTZhYTEyN2E3Mjg2N2M4MmIyN2Y0NzQzODNhN2QyMzdkMGI5OGI5NTJhMTI5ZWU0In0.eyJhdWQiOiI3IiwianRpIjoiYjFmMTYyNWUzMGM3MGM4MjYzNDZmOWU5M2JiZTZhMzE5NmFhMTI3YTcyODY3YzgyYjI3ZjQ3NDM4M2E3ZDIzN2QwYjk4Yjk1MmExMjllZTQiLCJpYXQiOjE1MDEwMDU2NzAsIm5iZiI6MTUwMTAwNTY3MCwiZXhwIjoxNTEzOTY1NjY5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.AkZpBnUX7XaCNsrp8I1U8lhWCaDFWt7XdRdVws1eVVqk8kEQkGryXJb_1brn9qzfNKqG3qZ3HyGVCj1NOru3mSUMq7CngRZnukCEO2_YZfHVXaWFgovK0p3rY47PrxrF8mXME6r3I7QxEFvogT5q20sJi-gQIoJ0SyOi97vq__viV3StcEQ66DYrxpf3zw-VY4uNi_zwmN9mbWCdi1cTSIcdTmBescjQBtl96vekki-oGvYDODlo83HTyDScyDfGeK95Awksfh7KmAi69sjAKyPeXpgXBOMjYx0iJ8mkbcdyS6Wq0_oEDLwRhGeHUaSQLUU4cyraYvO3nwobzQ3PWZxPriTnY7p_xOVxJTE1oMYuf336t3UrOtRaNtshQ45BBgHGksWHKBbyVEJHzg82FQ6e5feu-tfS1ISl4ft3NhE3_QkYESZwuRI9sPevBwDMFgrChudqUaV6iFxPnBTfuKbHbnm3sbTgDE59VCo4_iQi04wMCQxIV_5hIAYLmgpujp7lmZzUNezUibodfJcGSm-47O71qX7PzusW2JsBTT_MJBz3qBZJt_hpAh3qhO0nzrjBo0gGIQiF5JGTRZhYiixnAS0c08DDCGVix97A_28s-E-gaVMWM_GpzJaMvHmaTRjtO4S4tFooiE2tFTMw_f969DBxTQlnkMvjgwp1EU0' } })
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
