import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerViewRequestPage } from './owner-view-request';

@NgModule({
  declarations: [
    OwnerViewRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerViewRequestPage),
  ],
})
export class OwnerViewRequestPageModule {}
