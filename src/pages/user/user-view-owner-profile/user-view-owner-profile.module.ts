import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewOwnerProfilePage } from './user-view-owner-profile';

@NgModule({
  declarations: [
    UserViewOwnerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewOwnerProfilePage),
  ],
})
export class UserViewOwnerProfilePageModule {}
