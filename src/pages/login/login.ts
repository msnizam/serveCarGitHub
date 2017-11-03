import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../model/user";
import { AngularFireAuth } from 'angularfire2/auth';

import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public nav: NavController, public navParams: NavParams) {
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.nav.setRoot(ProfilePage);
        this.nav.popToRoot();
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  async register() {
    this.nav.push(RegisterPage);
  }
}
