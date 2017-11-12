import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../../model/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  loginForm: FormGroup;

  constructor(public loadingCtrl: LoadingController, private afAuth: AngularFireAuth, private alertCtrl: AlertController, public nav: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.nav = nav;

       this.loginForm = formBuilder.group({
           email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
           password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
       });
  }

  async login(user: User) {
    try {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((user) => {
        if(user.emailVerified){
          let loader = this.loadingCtrl.create({
            content: `Welcome ${user.email} `,
            duration: 1500
          });
          loader.present();
          this.nav.setRoot(ProfilePage);
        }
        else{
            this.presentAlert()
        }
      });
    }
    catch (e) {
      console.error(e);
    }
  }

  async register() {
    this.nav.setRoot(RegisterPage);
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
    title: 'Email Verification',
    subTitle: 'Please check your email to verify your account',
    buttons: ['Dismiss']
  });
  alert.present();
  }
}
