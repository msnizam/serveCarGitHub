import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewAcceptBookPage } from './user-view-accept-book';

@NgModule({
  declarations: [
    UserViewAcceptBookPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewAcceptBookPage),
  ],
})
export class UserViewAcceptBookPageModule {}
