import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../../model/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user = {} as User;

  registerForm: FormGroup;

  constructor(public loadingCtrl: LoadingController, private afAuth: AngularFireAuth, private afData: AngularFireDatabase, public nav: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.nav = nav;

       this.registerForm = formBuilder.group({
           fullname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
           username: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
           email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
           phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
           password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
       });
  }


  async register(user: User) {
    try {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((res) => {
        this.sendEmailVerification()
      })
      .catch((err) => {
        console.error(err)
      });
    } catch (e) {
      console.error(e);
    }
  }

  sendEmailVerification() {
    try{
      this.afAuth.authState.subscribe(auth => {
          auth.sendEmailVerification()
          .then(() => {
            let loader = this.loadingCtrl.create({
              content: `Email Link Has Been Sent. Please Check!`,
              duration: 1500
            });
            loader.present();
            this.sendDataProfile()
            //this.nav.setRoot(LoginPage);
          })
        });
    }
    catch(e){
      console.error(e);
    }
  }

  sendDataProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afData.object(`person/${auth.uid}`).set(this.user)
      .then(() => {this.nav.setRoot(LoginPage);});
    })
  }
/*presentConfirm() {
let alert = this.actionSheetCtrl.create({
    title: 'Email Verification',
    message: 'Your Email link has been sent.',
    buttons: [
      {
        text: 'Ok',
        handler: () => {this.nav.setRoot(LoginPage);}
      }
    ]
  });
  alert.present();
}*/
}
