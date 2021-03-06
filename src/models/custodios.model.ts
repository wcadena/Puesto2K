export class  CustodioData {
  id:	number	;
  nombre_responsable:	string	;
  pais:	string	;
  ciudad:	string	;
  direccion:	string	;
  documentoIdentificacion:	string	;
  cargo:	string	;
  compania:	string	;
  telefono:	string	;
  estado:	string	;
  fechaCreacion:	Date	;
  fechaActualizacion:	Date	;
  fechaEliminacion: Date ;
  links : any ;
  celular :string;
  ext:string;
  image:string;



  constructor(id:number,
              nombre_responsable:string,
              pais:string,
              ciudad:string,
              direccion:string,
              documentoIdentificacion:string,
              cargo:string,
              compania:string,
              telefono:string,
              estado:string,
              celular:string,
              ext:string,
              fechaCreacion:Date,
              fechaActualizacion:Date,
              fechaEliminacion:Date,
              image:string,
              links : any) {
    this.id = id;
    this.pais = pais;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.documentoIdentificacion = documentoIdentificacion;
    this.cargo = cargo;
    this.compania = compania;
    this.telefono = telefono;
    this.estado = estado;
    this.celular = celular;
    this.ext = ext;
    this.image = image;
    this.fechaCreacion = fechaCreacion;
    this.fechaActualizacion = fechaActualizacion;
    this.fechaEliminacion = fechaEliminacion;
    this.nombre_responsable = nombre_responsable;
    this.links = links;
  }
  /*public ParseCustodioData(data:any){
    return CustodioData(data.data.id,
      nombre_responsable:string,
      pais:string,
      ciudad:string,
      direccion:string,
      documentoIdentificacion:string,
      cargo:string,
      compania:string,
      telefono:string,
      estado:string,
      fechaCreacion:Date,
      fechaActualizacion:Date,
      fechaEliminacion:Date,
      links : any);
  }*/
}

