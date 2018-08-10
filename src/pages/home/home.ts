import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormControl } from '@angular/forms';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

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
    // private _db:DatabaseService
  ) {
    // let dataStorage =  JSON.parse(localStorage.getItem('userData'))
    //this.datosObras = this._login.datosObras;

    if(localStorage.getItem('obras')){
      console.log("Hay datos");
      this.obras = true;
      this.datosObras = this._login.datosObras;
      console.log(this.obras);
    }
  }

  actualizar(){
    this.datosObras = this._login.datosObras;
    this.obras = true;
    console.log(this.obras)
  }

  goToMyPage(id) {
    // go to the MyPage component
    this.navCtrl.push(AboutPage, {
      'id': id
    });
  }

  upload(){
    let data = [];
    data.push(JSON.parse(localStorage.getItem('mediciones')));
    console.log(data)
    this._login.upload(data)
        .subscribe( (resp:any) => {
          console.log(resp);
        })
  }

}
