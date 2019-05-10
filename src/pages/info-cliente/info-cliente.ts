import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';

import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';

import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
    private _login:ServicesLoginProvider,
    public alertCtrl: AlertController
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
          console.log(this.datosTarea)
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
          canayu: new FormControl(),
          canoesp: new FormControl(),
          canhseq: new FormControl()

    });

    this.medicionForm.controls['horini'].setValidators([
        Validators.required,
        this.validarHora.bind(this.medicionForm.controls)
    ])

    this.medicionForm.controls['horfin'].setValidators([
        Validators.required,
        this.validarHora.bind(this.medicionForm.controls)
    ])
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoClientePage');
  }

  saveMedicion(){
    //seteo los valores ocultos del formulario
    // this.medicionForm.controls['numero'].setValue(this.obra);
    // this.medicionForm.controls['codtar'].setValue(this.tarea);

    //OBtengo primero las mediciones del dataStorage
    // this.medicionesPre = JSON.parse(localStorage.getItem("mediciones"));
    //
    // console.log(this.medicionesPre)
    //Agrego la nueva medicicion

    this.hayMediciones = true;

    this.mediciones.push(this.medicionForm.value);
    console.log(this.mediciones)
    //Se vuelve a guardar en el storage
    localStorage.setItem("mediciones", JSON.stringify(this.mediciones))

    this.medicionForm.reset();

    this.medicionForm.controls['numero'].setValue(this.obra);
    this.medicionForm.controls['codtar'].setValue(this.tarea);

  }

  upload(){
    let data = [];
    data.push(JSON.parse(localStorage.getItem('mediciones')));
    console.log(data)
    this._login.upload(data)
        .subscribe( (resp:any) => {
          console.log(resp);
          if(resp==1){
            this.mediciones = [];//del
            this.hayMediciones = true;
            localStorage.removeItem('mediciones');
            localStorage.removeItem('obras');
            localStorage.removeItem('tareas');
            //this.datosTareas = [];
            this.datosObra = [];
            this.navCtrl.push(HomePage);
            this.showAlert();
          }else{
            console.log("error");
            this.showAlert2(resp);
          }
        })
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Actualización correcta',
      subTitle: 'Las mediciones se han Subido correctamente a la base de datos!',
      buttons: ['Continuar']
    });
    alert.present();
  }

  showAlert2(error) {
    console.log("error");
    const alert = this.alertCtrl.create({
      title: 'Error en Actualización',
      subTitle: error,
      buttons: ['Continuar']
    });
    alert.present();
  }



  validarHora( control:FormControl):{ [s:string]:boolean } {
    // console.log(this);

    let time1 = this['horini'].value;
    let time2 = this['horfin'].value;
    //
    console.log(time1);
    console.log(time2);

    if(time1 > time2) {
       console.log("el correo es mas grande");
      return{
        vacio:true
      }
    }

    return null
  }

}
