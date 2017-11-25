import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerEditProfilePage } from './owner-edit-profile';

@NgModule({
  declarations: [
    OwnerEditProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerEditProfilePage),
  ],
})
export class OwnerEditProfilePageModule {}
