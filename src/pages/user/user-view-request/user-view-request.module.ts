import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewRequestPage } from './user-view-request';

@NgModule({
  declarations: [
    UserViewRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewRequestPage),
  ],
})
export class UserViewRequestPageModule {}
