import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerViewCarPage } from './owner-view-car';

@NgModule({
  declarations: [
    OwnerViewCarPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerViewCarPage),
  ],
})
export class OwnerViewCarPageModule {}
