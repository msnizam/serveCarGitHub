import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Driver } from './../../../models/driver/driver.model';

@IonicPage()
@Component({
  selector: 'page-owner-view-book-car',
  templateUrl: 'owner-view-book-car.html',
})
export class OwnerViewBookCarPage {
  driver: Driver = {
    ownerPlate: '',
    name: '',
    ic: undefined,
    phone: undefined,
    address: '',
    dateBook: '',
    time: undefined
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.driver = this.navParams.get('driver');
  }

}
