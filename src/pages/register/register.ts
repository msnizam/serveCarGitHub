import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../../models/owner/owner.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';

import { CreateProfilePage } from '../create-profile/create-profile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user = {} as User;

  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    public formBuilder: FormBuilder) {

      this.registerForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      })
  }


  async register(user: User) {
    try {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((res) => {
        this.sendEmailVerification()
      });
    } catch (e) {
      console.error(e);
    }
  }

  sendEmailVerification() {
      this.afAuth.authState.subscribe(auth => {
          auth.sendEmailVerification()
          .then(() => {
            /*let loader = this.loadingCtrl.create({
              content: `Email Link Has Been Sent. Please Check!`,
              duration: 1000
            });
            loader.present();*/
            this.presentConfirm();
            //this.navCtrl.setRoot(CreateProfilePage);
          })
        });

  }

  presentConfirm() {
  let alert = this.alertCtrl.create({
      title: 'Email Verification',
      message: 'Your Email link has been sent.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {this.navCtrl.setRoot(CreateProfilePage);}
        }
      ]
    });
    alert.present();
  }
}
