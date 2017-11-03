import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../../model/user";
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user = {} as User;

  registerForm: FormGroup;

  constructor(private afAuth: AngularFireAuth, public nav: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.nav = nav;

       this.registerForm = formBuilder.group({
           email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
           password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
       });
  }


  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.nav.setRoot(LoginPage);
      }
    } catch (e) {
      console.error(e);
    }
  }

}
