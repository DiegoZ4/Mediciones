import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormControl, Validators } from '@angular/forms';

import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';

import { ServicesLoginProvider } from '../../providers/services-login/services-login';

import 'rxjs';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  id = 0;
  loginPass:FormGroup;
  data = {};

  datosTareas = []
  datosObra = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _login:ServicesLoginProvider,
    public alertCtrl: AlertController
  ) {

    this.id = this.navParams.get('id');
    console.log(this.id);
    this.loginPass = new FormGroup ({
        pass1: new FormControl('', Validators.required),
        pass2: new FormControl(),
    });


    for(let tarea of this._login.datosTareas){
      if (tarea.numero == this.id ){
         this.datosTareas.push(tarea);
      }
    }

    //Obtengo el nombre de la obra desde el dataStorage
    let obrasStorage = JSON.parse(localStorage.getItem('obras'))
    for(let obra of obrasStorage){
        if(obra.numero == this.id){
          this.datosObra = obra;
        }
    }

  }

  goToMyPage(tarea, obra) {
    // go to the MyPage component
    this.navCtrl.push('InfoClientePage', {
      'tarea': tarea,
      'obra': obra
    });
  }

  upload(){
    let data = [];
    data.push(JSON.parse(localStorage.getItem('mediciones')));
    console.log(data)
    this._login.upload(data)
        .subscribe( (resp:any) => {
          console.log(resp);
          if(resp==1){
            localStorage.removeItem('mediciones');
            localStorage.removeItem('obras');
            localStorage.removeItem('tareas');
            this.datosTareas = [];
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

}
