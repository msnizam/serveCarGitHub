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
    carMake: '',
    carModel: '',
    ownerPlate: '',
    ownerUsername: '',
    name: '',
    renter: '',
    ic: undefined,
    phone: undefined,
    location: '',
    dateBook: '',
    status: '',
    startTime: undefined,
    //endTime: undefined,
    rentPeriod: undefined,
    price: undefined
  }

  acceptBook: Accept = {
    ownerPlate: '',
    username: '',
    dateBook: '',
    price: undefined,
    time: undefined
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
      carMake: this.driver.carMake,
      carModel: this.driver.carModel,
      ownerPlate: this.driver.ownerPlate,
      ownerUsername: this.driver.ownerUsername,
      name: this.driver.name,
      renter: this.driver.renter,
      ic: this.driver.ic,
      phone: this.driver.phone,
      location: this.driver.location,
      dateBook: this.driver.dateBook,
      status: "Accepted",
      startTime: this.driver.startTime,
      //endTime: this.driver.endTime,
      rentPeriod: this.driver.rentPeriod,
      price: this.driver.price
    }).then(() => {
      this.bookStatusRef.getBookAcceptList().push({
        ownerPlate: this.driver.ownerPlate,
        username: this.driver.renter,
        dateBook: this.driver.dateBook,
        price: this.driver.price,
        time: this.driver.startTime
      })
      this.navCtrl.setRoot(OwnerProfilePage, {key: this.bookKey});
    });
  }

  async reject(driver: Driver){
    this.bookRef.getCarBookList().update(this.bookKey, {
      carMake: this.driver.carMake,
      carModel: this.driver.carModel,
      ownerPlate: this.driver.ownerPlate,
      ownerUsername: this.driver.ownerUsername,
      name: this.driver.name,
      renter: this.driver.renter,
      ic: this.driver.ic,
      phone: this.driver.phone,
      location: this.driver.location,
      dateBook: this.driver.dateBook,
      status: "Rejected",
      startTime: this.driver.startTime,
      //endTime: this.driver.endTime,
      rentPeriod: this.driver.rentPeriod,
      price: this.driver.price
    }).then(() => {
      this.navCtrl.push("OwnerRejectBookPage", {driver: driver});
    });
  }

}
