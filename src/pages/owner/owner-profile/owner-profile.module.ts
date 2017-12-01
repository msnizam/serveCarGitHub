import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerProfilePage } from './owner-profile';

@NgModule({
  declarations: [
    OwnerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerProfilePage),
  ],
})
export class OwnerProfilePageModule {}
