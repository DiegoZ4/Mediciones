//import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the ServicesLoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesLoginProvider {

  apiUrl = 'http://appsausol.com.ar.elserver.com/vendedores.php';
  apiUrlObra = 'http://nubelaz.com.ar.elserver.com/mediciones/obra.php';
  apiUrlObras = 'http://nubelaz.com.ar.elserver.com/mediciones/obras.php';
  apiUrlMediciones = 'http://nubelaz.com.ar.elserver.com/mediciones/mediciones.php';
  apiUrlMedicion = 'http://nubelaz.com.ar.elserver.com/mediciones/medicion.php';
  apiUrlTareas = 'http://nubelaz.com.ar.elserver.com/mediciones/tareas2.php';
  apiUrlUpload = 'http://nubelaz.com.ar.elserver.com/mediciones/upload7.php';


  datosObras = [];
  datosMediciones = [];
  datosTareas = [];


  constructor(public http: HttpClient) {
    console.log('Hello ServicesLoginProvider Provider');



  }


  login() {
    console.log("aca")
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        //console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }



  getObras(){

    return this.http.get(this.apiUrlObras)
      .map(res => {
          return res;
        }, (err) => {
          console.log(err);
        });
  }

  getTareas(){
    return this.http.get(this.apiUrlTareas)
      .map(res => {
          return res;
        }, (err) => {
          console.log(err);
        });
  }

  getMediciones(){
    return this.http.get(this.apiUrlMediciones)
      .map(res => {
          return res;
        }, (err) => {
          console.log(err);
        });
  }

  getMedicion(id){
    return this.http.get(this.apiUrlMedicion+'?id='+id)
      .map(res => {
          return res;
        }, (err) => {
          console.log(err);
        });
  }

  getObra(id){
    return this.http.get(this.apiUrlObra+'?id='+id)
      .map(res => {
          return res;
        }, (err) => {
          console.log(err);
        });
  }

  upload(info){
    console.log(info)
    return this.http.post(this.apiUrlUpload, info);
  }

}
