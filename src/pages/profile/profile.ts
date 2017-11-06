import { Component } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import firebase from 'firebase';

import { HomePage } from '../home/home';
import { RegisterCarPage } from '../register-car/register-car';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileData: FirebaseObjectObservable<User>

  constructor(private afAuth: AngularFireAuth, private afData: AngularFireDatabaseModule, public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
  }

    ionViewWillLoad() {
    this.profileData = this.afData.object(`person1/${auth.uid}`)
  }
  async addCar(){
    this.navCtrl.setRoot(RegisterCarPage);
  }

  async logout(){
    this.afAuth.auth.signOut().then(() => {
       console.log("Logout successful");
       this.navCtrl.setRoot(HomePage);
    });
    }
}
