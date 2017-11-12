import { Component } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { HomePage } from '../home/home';
import { RegisterCarPage } from '../register-car/register-car';
import { User } from "../../model/user";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  //user = {} as User;

  profileData: AngularFireObject<User>

  constructor(private afAuth: AngularFireAuth, private afData: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
  }

    ionViewWillLoad() {
      this.afAuth.authState.take(1).subscribe(data => {
        if(data){
        this.profileData = this.afData.object(`person/${data.uid}`)
        }
      })

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
