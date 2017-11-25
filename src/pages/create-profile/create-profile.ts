import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { Owner } from './../../models/owner/owner.model';
import { OwnerDetailsService } from './../../services/owner-details/owner-details.service';

import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {
  public email = "";

  profileForm: FormGroup;

  constructor(public loadingCtrl: LoadingController, private owner: OwnerDetailsService, private afAuth: AngularFireAuth, private afData: AngularFireDatabase, public nav: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.nav = nav;

       this.profileForm = formBuilder.group({
           fullname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
           username: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
           phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])]
       });
  }

  create(owner: Owner) {
    this.afAuth.authState.subscribe(user => {
      this.afData.object(`Car-Rental/Owner/${user.uid}`).set({
        fullname : owner.fullname,
        username : owner.username,
        phone : owner.phone,
        email: user.email }).then(ref => {
        this.nav.setRoot(ProfilePage);
      });
  })
}
}
