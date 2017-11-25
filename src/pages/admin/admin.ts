import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase';
import { Admin } from './../../models/admin/admin.model';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
    adminRef: firebase.database.Reference;

    public email = "";
    public password = "";

    myAdmin = {} as Admin;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.adminRef = firebase.database().ref(`Car-Rental/Owner`);
    this.afAuth.authState.subscribe(admin => {
      //this.password = admin.password;
      this.adminRef.set({
        email: admin.email,
        //password: this.password
      });
    })
  }

  ionViewDidLoad() {
    this.getAdmin().on('value', snapshot => {
        this.myAdmin = snapshot.val();
    });
  }
  getAdmin(){
    return this.adminRef;
  }

}
