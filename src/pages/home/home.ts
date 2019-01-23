import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {FormGroup, FormControl } from '@angular/forms';

import { AlertController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

import { Storage } from '@ionic/storage';

//Services
import { ServicesLoginProvider } from '../../providers/services-login/services-login';
// import { DatabaseService } from '../../providers/services-login/database-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  id:string;
  datosObras = []

  loginForm:FormGroup;

  obras:boolean = false;

  // inputtext:string;
  // key:string = 'username';

  // constructor(
  //   public navCtrl: NavController,
  //   public _login:ServicesLoginProvider
  // ) {
  //   this.loginForm = new FormGroup ({
  //       user: new FormControl(),
  //       pass: new FormControl(),
  //   });
  // }

  constructor(
    public navCtrl: NavController,
    private _login:ServicesLoginProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    private viewCtrl: ViewController
    // private _db:DatabaseService
  ) {
    // let dataStorage =  JSON.parse(localStorage.getItem('userData'))
    //this.datosObras = this._login.datosObras;

    if(!localStorage.getItem('obras')) {

    }else{
      console.log("ya hay datos cargados");
      this._login.datosObras = JSON.parse(localStorage.getItem("obras"));
      this._login.datosMediciones = JSON.parse(localStorage.getItem("mediciones"));
      this._login.datosTareas = JSON.parse(localStorage.getItem("tareas"));
    }

    if(localStorage.getItem('obras')){
      console.log("Hay datos");
      this.obras = true;
      this.datosObras = this._login.datosObras;
      console.log(this.obras);
    }
  }


  // saveData(){
  //   // set a key/value
  //   this.storage.set(this.key, this.inputtext);
  // }
  //
  // loadData(){
  //   // Or to get a key/value pair
  //   this.storage.get(this.key).then((val) => {
  //     console.log('Your Team is', val);
  //   });
  //
  // }

  actualizar(){
    this._login.getObras()
        .subscribe((resp:any)=>{
          this._login.datosObras = resp;
          console.log(this._login.datosObras);

          this._login.getTareas()
              .subscribe((resp:any)=>{
                this._login.datosTareas = resp;
                console.log(this._login.datosTareas);

                localStorage.setItem('obras', JSON.stringify(this._login.datosObras));
                localStorage.setItem('mediciones', JSON.stringify(this._login.datosMediciones));
                localStorage.setItem('tareas', JSON.stringify(this._login.datosTareas));

                this.obras = true;
                this.datosObras = this._login.datosObras;
              })
        })
  }

  goToMyPage(id) {
    // go to the MyPage component
    this.navCtrl.push(AboutPage, {
      'id': id
    });
  }

  ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
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
            this.datosObras = [];
            this.obras = false;
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
