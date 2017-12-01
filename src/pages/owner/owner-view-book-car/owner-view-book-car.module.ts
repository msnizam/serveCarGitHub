import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerViewBookCarPage } from './owner-view-book-car';

@NgModule({
  declarations: [
    OwnerViewBookCarPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerViewBookCarPage),
  ],
})
export class OwnerViewBookCarPageModule {}
