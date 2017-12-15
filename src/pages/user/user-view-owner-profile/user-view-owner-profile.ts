import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Car } from './../../../models/car/car.model';
import { Owner } from './../../../models/owner/owner.model';

@IonicPage()
@Component({
  selector: 'page-user-view-owner-profile',
  templateUrl: 'user-view-owner-profile.html',
})
export class UserViewOwnerProfilePage {
  myPerson : Owner;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.myPerson = this.navParams.get("owner");
  }

}
