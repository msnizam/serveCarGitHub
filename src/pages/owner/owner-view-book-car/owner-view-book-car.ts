import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Driver } from './../../../models/driver/driver.model';
import { Accept } from './../../../models/owner/owner.model';
import { CarBookService } from './../../../services/car-list/car-book.service';
import { CarStatusService } from './../../../services/car-list/car-status.service';
import { OwnerProfilePage } from '../../owner/owner-profile/owner-profile';

@IonicPage()
@Component({
  selector: 'page-owner-view-book-car',
  templateUrl: 'owner-view-book-car.html',
})
export class OwnerViewBookCarPage {
  driver: Driver = {
    ownerPlate: '',
    name: '',
    username: '',
    ic: undefined,
    phone: undefined,
    address: '',
    dateBook: '',
    status: '',
    time: undefined
  }

  acceptBook: Accept = {
    ownerPlate: '',
    username: '',
    dateBook: ''
  }
  public bookKey: '';

  constructor(public navCtrl: NavController, private bookRef: CarBookService, private bookStatusRef: CarStatusService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.driver = this.navParams.get('driver');
    this.bookKey = this.navParams.get('key');
  }

  async accept(driver: Driver){
    this.bookRef.getCarBookList().update(this.bookKey, {
      ownerPlate: this.driver.ownerPlate,
      name: this.driver.name,
      username: this.driver.username,
      ic: this.driver.ic,
      phone: this.driver.phone,
      address: this.driver.address,
      dateBook: this.driver.dateBook,
      status: "Accepted",
      time: this.driver.time
    }).then(() => {
      this.bookStatusRef.getBookAcceptList().push({
        ownerPlate: this.driver.ownerPlate,
        username: this.driver.username,
        dateBook: this.driver.dateBook,
      })
      this.navCtrl.setRoot(OwnerProfilePage, {key: this.bookKey});
    });
  }

  async reject(driver: Driver){
    this.bookRef.getCarBookList().update(this.bookKey, {
      ownerPlate: this.driver.ownerPlate,
      name: this.driver.name,
      username: this.driver.username,
      ic: this.driver.ic,
      phone: this.driver.phone,
      address: this.driver.address,
      dateBook: this.driver.dateBook,
      status: "Rejected",
      time: this.driver.time
    }).then(() => {
      this.navCtrl.push("OwnerRejectBookPage", {driver: driver});
    });
  }

}
