import { Component } from '@angular/core';

/**
 * Generated class for the PagesInfoClienteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pages-info-cliente',
  templateUrl: 'pages-info-cliente.html'
})
export class PagesInfoClienteComponent {

  text: string;

  constructor() {
    console.log('Hello PagesInfoClienteComponent Component');
    this.text = 'Hello World';
  }

}
