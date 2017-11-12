import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../../model/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import firebase from 'firebase';


import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user = {} as User;

  registerForm: FormGroup;

  constructor(private afAuth: AngularFireAuth, private afData: AngularFireDatabase, public nav: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.nav = nav;

       this.registerForm = formBuilder.group({
           fullname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
           username: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
           email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
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
          .then(() => { this.sendDataProfile()
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
        handler: () => {console.log(LoginPage);}
      }
    ]
  });
  alert.present();
}*/
}
