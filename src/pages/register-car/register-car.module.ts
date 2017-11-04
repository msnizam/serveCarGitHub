import { NgModule, Component } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCarPage } from './register-car';

@NgModule({
  declarations: [
    RegisterCarPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCarPage),
  ],
})
export class RegisterCarPageModule {}
