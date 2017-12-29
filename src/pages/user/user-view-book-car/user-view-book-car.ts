import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Driver } from './../../../models/driver/driver.model';
import { Accept } from './../../../models/owner/owner.model';
import { CarBookService } from './../../../services/car-list/car-book.service';
import { CarStatusService } from './../../../services/car-list/car-status.service';
import { OwnerProfilePage } from '../../owner/owner-profile/owner-profile';
@IonicPage()
@Component({
  selector: 'page-user-view-book-car',
  templateUrl: 'user-view-book-car.html',
})
export class UserViewBookCarPage {
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
  public bookKey: '';

  constructor(public navCtrl: NavController, private bookRef: CarBookService, private bookStatusRef: CarStatusService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.driver = this.navParams.get('driver');
    this.bookKey = this.navParams.get('key');
  }

}
