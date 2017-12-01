import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerEditCarPage } from './owner-edit-car';

@NgModule({
  declarations: [
    OwnerEditCarPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerEditCarPage),
  ],
})
export class OwnerEditCarPageModule {}
