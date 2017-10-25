import { AUTHORIZATION_BEARER } from './../../config/url.servicios';

import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {ConnectorProvider} from "../../providers/connector/connector";
import {URL_SERVICIOS_PROD} from "../../config/url.servicios";
import { Platform } from 'ionic-angular';


import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ImagenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-imagen',
  templateUrl: 'imagen.html',
})
export class ImagenPage {


  imagenPreview: string = "";
  imagen64: string = "";


  constructor(private viewCtrl: ViewController,
              private camera: Camera,
             private imagePicker: ImagePicker,
              public _con: ConnectorProvider,
              public platform: Platform,

              private transfer: Transfer
  ) {
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  mostrar_camara(){

    const options: CameraOptions = {
      quality: 5,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      this.imagen64 = imageData;

    }, (err) => {
      // Handle error
      console.log( "ERROR EN CAMARA", JSON.stringify(err) );
    });

  }

  seleccionar_foto(){

    let opciones:ImagePickerOptions = {
      quality: 5,
      outputType: 1,
      maximumImagesCount: 1
    }


    this.imagePicker.getPictures(opciones).then((results) => {

      for (var i = 0; i < results.length; i++) {
         console.log('Image URI: ' + results[i]);
         console.log(results[i]);
        if (!this.platform.is('ios')) {
          this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
          this.imagen64 = results[i];
        }else{
          this.imagenPreview =  results[i];
          this.imagen64 = results[i];
        }
      }

    }, (err) => {

      console.log( "ERROR en selector", JSON.stringify(err) );

    });

  }

  crear_post()
  {

    let options = {

      quality: 100
    };


    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:

      const fileTransfer: TransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'name.jpg',
        headers: {Authorization: 'Bearer ' + AUTHORIZATION_BEARER }

      }

      let url = URL_SERVICIOS_PROD + "api/custodiosSetImage?";

      fileTransfer.upload(imageData, url, options1)
        .then((data) => {
          // success
          alert("success");
        }, (err) => {
          // error
          alert("error"+JSON.stringify(err));
        });


    });


  }

  crear_post_old() {


    /*
    var data ="id="+1+"&"+
      "image="+this.imagen64+"&fin=si";
    let url = URL_SERVICIOS_PROD + "api/custodiosSetImage?"+data;

    let body = ({
			id: 1,
			image: this.imagen64,
      fin: "si"
		});

    let post = this._con.PostData(url,body);
    post.then((value) => {
      console.log(value);
      this.cerrar_modal();
    }, function(e) {
      console.error(e)
    });
    */
/*
    let archivo = {
      img: this.imagen64,
      titulo: this.titulo
    }

    this._cap.cargar_imagen_firebase(archivo)
      .then(() => this.cerrar_modal())
      */
  }




    ionViewDidLoad() {
    console.log('ionViewDidLoad ImagenPage');
  }



}
