import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewCarPage } from './user-view-car';

@NgModule({
  declarations: [
    UserViewCarPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewCarPage),
  ],
})
export class UserViewCarPageModule {}
