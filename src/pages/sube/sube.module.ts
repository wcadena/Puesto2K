import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubePage } from './sube';

@NgModule({
  declarations: [
    SubePage,
  ],
  imports: [
    IonicPageModule.forChild(SubePage),
  ],
})
export class SubePageModule {}
