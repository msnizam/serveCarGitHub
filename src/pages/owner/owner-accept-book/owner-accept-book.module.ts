import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerAcceptBookPage } from './owner-accept-book';

@NgModule({
  declarations: [
    OwnerAcceptBookPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerAcceptBookPage),
  ],
})
export class OwnerAcceptBookPageModule {}
