import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoClientePage } from './info-cliente';

@NgModule({
  declarations: [
    InfoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(InfoClientePage),
  ],
})
export class InfoClientePageModule {}
