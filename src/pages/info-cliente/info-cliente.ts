import { Component } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesLoginProvider } from '../../providers/services-login/services-login';

/**
 * Generated class for the InfoClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-cliente',
  templateUrl: 'info-cliente.html',
})
export class InfoClientePage {
  pet: string = "pagos";

  tarea = 0;
  obra = 0;

  medicionForm:FormGroup;

  mediciones = [];//del
  medicionesPre = [];
  hayMediciones:boolean = false;

  datosObra = [];
  datosTarea = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _login:ServicesLoginProvider
  ) {

    console.log( this.navParams.get('tarea'));
    this.tarea = this.navParams.get('tarea');

    console.log( this.navParams.get('obra'));
    this.obra = this.navParams.get('obra');

    //Obtengo el nombre de la obra desde el dataStorage
    let obrasStorage = JSON.parse(localStorage.getItem('obras'))
    for(let obra of obrasStorage){
        if(obra.numero == this.obra){
          this.datosObra = obra;
        }
    }

    let tareasStorage = JSON.parse(localStorage.getItem('tareas'))
    for(let tarea of tareasStorage){
        if(tarea.codtar == this.tarea){
          this.datosTarea = tarea;
        }
    }


    if(localStorage.getItem("mediciones")){
      //OBtengo primero las mediciones del dataStorage
      let mediciones = JSON.parse(localStorage.getItem("mediciones"));

      for(let medicion of mediciones){
        if(medicion.numero == this.obra && medicion.codtar == this.tarea){
          this.mediciones.push(medicion);
          this.hayMediciones = true;
        }
      }

    }else{
      this.hayMediciones = false;
    }


    this.medicionForm = new FormGroup ({
          numero: new FormControl(this.obra),
          codtar: new FormControl(this.tarea),
          fecha: new FormControl(),
          horini: new FormControl(),
          horfin: new FormControl(),
          cantidad: new FormControl(),
          tipmed: new FormControl(),
          canofi: new FormControl(),
          canayu: new FormControl()

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoClientePage');
  }

  saveMedicion(){
    //seteo los valores ocultos del formulario
    // this.medicionForm.controls['numero'].setValue(this.obra);
    // this.medicionForm.controls['codtar'].setValue(this.tarea);

    //OBtengo primero las mediciones del dataStorage
    this.medicionesPre = JSON.parse(localStorage.getItem("mediciones"));

    console.log(this.medicionesPre)
    //Agrego la nueva medicicion
    this.medicionesPre.push(this.medicionForm.value);
    console.log(this.medicionesPre)
    //Se vuelve a guardar en el storage
    localStorage.setItem("mediciones", JSON.stringify(this.medicionesPre))
  }

}
