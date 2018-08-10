import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { Http } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DatabaseService {

  private db : SQLiteObject;
  private isOpen : boolean;

  constructor(
    // public http:Http,
    public storage:SQLite
  ) {
    if(!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({name: 'lazarte_mediciones.db', location:'default'})
          .then((db:SQLiteObject) => {
            this.db = db;
            db.executeSql("CREATE TABLE IF NOT EXISTS lazrencab (numero INTEGER,denobr TEXT);",[])
            this.isOpen = true;
          }).catch((error)=>{
            console.log(error);
          })
    }
  }

  // createMedicion(numero:number, codtar:string, fecha:Date, horini:string, horfin:string, cantidad:number, tipmed:string, canofi:number, canayu:number){
  //   return new Promise((resolve, reject) => {
  //       let sql = "INSERT INTO lazrenmed (numero, codtar, fecha, horini, horfin, cantidad, tipmed,canofi, canayu) VALUES (?,?,?,?,?,?,?,?,?)";
  //       this.db.executeSql(sql, [numero, codtar, fecha, horini, horfin, cantidad, tipmed,canofi, canayu])
  //              .then((data)=>{
  //                resolve(data)
  //              }, (error)=>{
  //                reject(error);
  //              });
  //   });
  // }

  getAllMediciones(){
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM lazrenmed", [])
             .then((data)=>{
               let arrayMediciones = [];
               if(data.rows.length > 0){
                 for(var i = 0; i < data.rows.length; i++){
                   arrayMediciones.push({
                     id:data.rows.item(i).id,
                     numero:data.rows.item(i).numero,
                     codtar:data.rows.item(i).codtar,
                     fecha:data.rows.item(i).fecha,
                     horini:data.rows.item(i).horini,
                     horfin:data.rows.item(i).horfin,
                     cantidad:data.rows.item(i).cantidad,
                     tipomed:data.rows.item(i).tipomed,
                     canofi:data.rows.item(i).canofi,
                     canayu:data.rows.item(i).canayu,
                   })
                 }
               }
               resolve(arrayMediciones);
             }, (error)=>{
               reject(error);
             })
    })
  }

  // private createTables(){
  //   console.log("crea table")
  //
  //   return this.database.executeSql(
  //     `CREATE TABLE IF NOT EXISTS lazrencab (
  //       numero INTEGER,
  //       denobr TEXT
  //     );`
  //   ,[])
  //   .then(()=>{
  //     return this.database.executeSql(
  //     `CREATE TABLE IF NOT EXISTS lazrenmed (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       numero INTEGER,
  //       codtar TEXT,
  //       fecha DATE
  //       horini TIME,
  //       horfin TIME,
  //       cantidad INTEGER,
  //       tipmed TEXT,
  //       canofi INTEGER,
  //       canayu INTEGER,
  //       FOREIGN KEY(codtar) REFERENCES lazrentar(codtar)
  //     );`,[] )
  //   }).then(()=>{
  //     return this.database.executeSql(
  //     `CREATE TABLE IF NOT EXISTS lazrentar (
  //       numero INTEGER,
  //       codtar TEXT,
  //       dentar TEXT,
  //       cerapio INTEGER
  //     )`,[] )
  //   }).catch((err)=>console.log("error detected creating tables", err));
  //
  // }





}
