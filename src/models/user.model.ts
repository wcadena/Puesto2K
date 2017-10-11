/**
 * para la coneccion del sistema, guardar en el disco dura local los datos de conexion
 */
export class  UserData {
  token_type:string;


  constructor(token_type:string) {
    this.token_type=token_type;
  }
}
