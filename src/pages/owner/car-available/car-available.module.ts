import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarAvailablePage } from './car-available';

@NgModule({
  declarations: [
    CarAvailablePage,
  ],
  imports: [
    IonicPageModule.forChild(CarAvailablePage),
  ],
})
export class CarAvailablePageModule {}
