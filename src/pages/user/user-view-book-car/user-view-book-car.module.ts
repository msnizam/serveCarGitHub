import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewBookCarPage } from './user-view-book-car';

@NgModule({
  declarations: [
    UserViewBookCarPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewBookCarPage),
  ],
})
export class UserViewBookCarPageModule {}
