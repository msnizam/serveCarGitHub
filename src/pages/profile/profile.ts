import { Component } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
  }

  async logout(){
    this.afAuth.auth.signOut().then(() => {
       //this.router.navigate(['']);
       console.log("Logout successful");
       this.navCtrl.setRoot(HomePage);
    });
    }
}
