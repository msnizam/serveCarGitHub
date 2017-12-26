import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewBookRequestPage } from './user-view-book-request';

@NgModule({
  declarations: [
    UserViewBookRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewBookRequestPage),
  ],
})
export class UserViewBookRequestPageModule {}
