import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerAddCarPage } from './owner-add-car';

@NgModule({
  declarations: [
    OwnerAddCarPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerAddCarPage),
  ],
})
export class OwnerAddCarPageModule {}
