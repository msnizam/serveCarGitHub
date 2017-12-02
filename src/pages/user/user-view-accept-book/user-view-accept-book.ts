import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Accept } from './../../../models/owner/owner.model';
import { UserProfilePage } from '../../user/user-profile/user-profile';


@IonicPage()
@Component({
  selector: 'page-user-view-accept-book',
  templateUrl: 'user-view-accept-book.html',
})
export class UserViewAcceptBookPage {
  book: Accept = {
    username: '',
    ownerPlate: '',
    dateBook: '',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.book = this.navParams.get('book');
  }

  async back(){
    this.navCtrl.setRoot(UserProfilePage);
  }

}
