import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensagePage } from './mensage';

@NgModule({
  declarations: [
    MensagePage,
  ],
  imports: [
    IonicPageModule.forChild(MensagePage),
  ],
})
export class MensagePageModule {}
