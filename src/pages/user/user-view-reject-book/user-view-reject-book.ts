import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Reject } from './../../../models/owner/owner.model';
import { UserProfilePage } from '../../user/user-profile/user-profile';
import { SearchPage } from '../../user/search/search';

@IonicPage()
@Component({
  selector: 'page-user-view-reject-book',
  templateUrl: 'user-view-reject-book.html',
})
export class UserViewRejectBookPage {
  book: Reject = {
    title: '',
    des: '',
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

  async searchCar(){
    this.navCtrl.setRoot(SearchPage);
  }

}
