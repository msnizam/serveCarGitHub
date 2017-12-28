import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Driver } from './../../../models/driver/driver.model';
import { Reject } from './../../../models/owner/owner.model';
import { CarStatusService } from './../../../services/car-list/car-status.service';
import { OwnerProfilePage } from '../../owner/owner-profile/owner-profile';

@IonicPage()
@Component({
  selector: 'page-owner-reject-book',
  templateUrl: 'owner-reject-book.html',
})
export class OwnerRejectBookPage {
  driver: Driver = {
    ownerPlate: '',
    name: '',
    renter: '',
    owner: '',
    ic: undefined,
    phone: undefined,
    location: '',
    dateBook: '',
    status: '',
    startTime: undefined,
    endTime: undefined,
    rentPeriod: undefined,
    price: undefined
  }

  rejectBook: Reject = {
    title: '',
    des: '',
    ownerPlate: '',
    username: '',
    dateBook: ''
  }
  public bookKey: '';
  constructor(public navCtrl: NavController, private bookStatusRef: CarStatusService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.driver = this.navParams.get('driver');
    this.bookKey = this.navParams.get('key');
  }

  async sendResult(rejectBook: Reject){
    this.bookStatusRef.getBookRejectList().push({
      title: rejectBook.title,
      des: rejectBook.des,
      ownerPlate: this.driver.ownerPlate,
      username: this.driver.renter,
      dateBook: this.driver.dateBook,
    }).then(() => {
      this.navCtrl.setRoot(OwnerProfilePage, {key: this.bookKey});
    })
  }

}
