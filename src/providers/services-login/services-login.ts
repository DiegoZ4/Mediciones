//import { HttpClient } from '@angular/common/http';
import { HttpClient , HttpHeaders } from '@angular/common/http';
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
  apiUrlTareas = 'http://nubelaz.com.ar.elserver.com/mediciones/tareas.php';
  apiUrlUpload = 'http://nubelaz.com.ar.elserver.com/mediciones/upload.php';


  datosObras = [];
  datosMediciones = [];
  datosTareas = [];

  constructor(public http: HttpClient) {
    console.log('Hello ServicesLoginProvider Provider');

    if(!localStorage.getItem('obras')) {
      this.getObras()
          .subscribe((resp:any)=>{
            this.datosObras = resp;
            console.log(this.datosObras);

            this.getMediciones()
                .subscribe((resp:any)=>{
                  this.datosMediciones = resp;

                  this.getTareas()
                      .subscribe((resp:any)=>{
                        this.datosTareas = resp;
                        console.log(this.datosTareas);

                        localStorage.setItem('obras', JSON.stringify(this.datosObras));
                        localStorage.setItem('mediciones', JSON.stringify(this.datosMediciones));
                        localStorage.setItem('tareas', JSON.stringify(this.datosTareas));
                      })

                })
          })
    }else{
      console.log("ya hay datos cargados");
      this.datosObras = JSON.parse(localStorage.getItem("obras"));
      this.datosMediciones = JSON.parse(localStorage.getItem("mediciones"));
      this.datosTareas = JSON.parse(localStorage.getItem("tareas"));
    }

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
