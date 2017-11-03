import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";

import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public nav: NavController, public navParams: NavParams) {
  }

  async login() {
    this.nav.setRoot(LoginPage);
  }

  async register() {
    this.nav.push(RegisterPage);
  }
}
