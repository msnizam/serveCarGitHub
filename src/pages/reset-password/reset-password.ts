import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  constructor(public loadingCtrl: LoadingController, private afAuth: AngularFireAuth, private afData: AngularFireDatabase, private alertCtrl: AlertController, public nav: NavController, public navParams: NavParams) {
    this.nav = nav;
  }

  reset(email) {
    this.afAuth.auth.sendPasswordResetEmail(email)
    .then(() => {
        let loader = this.loadingCtrl.create({
          content: `Your Password Has Been Reset `,
          duration: 1000
        });
        loader.present();
        this.nav.setRoot(LoginPage);
    })
  }

}
