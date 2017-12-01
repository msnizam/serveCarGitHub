import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarBookPage } from './car-book';

@NgModule({
  declarations: [
    CarBookPage,
  ],
  imports: [
    IonicPageModule.forChild(CarBookPage),
  ],
})
export class CarBookPageModule {}
