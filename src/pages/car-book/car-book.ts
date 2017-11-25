import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';

import firebase from 'firebase';
import { SearchPage } from '../search/search';
import { Driver } from './../../models/driver/driver.model';

@IonicPage()
@Component({
  selector: 'page-car-book',
  templateUrl: 'car-book.html',
})
export class CarBookPage {
  driver: Driver = {
    ownerPlate: '',
    name: '',
    ic: undefined,
    phone: undefined,
    address: '',
    dateBook: '',
    time: undefined
  }

  public ownerCarPLate = '';

  constructor(
    private afData: AngularFireDatabase,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //this.ownerCarPLate = car.plate;
  }

  bookCar(driver: Driver){
    this.afData.list(`Car-Rental/Car-Book`).push({
      //ownerPlate: this.ownerCarPLate,
      name: driver.name,
      ic: driver.ic,
      phone: driver.phone,
      address: driver.address,
      dateBook: driver.dateBook,
      time: driver.time
    }).then(() => {
      this.loading();
    })
  }

  loading(){
    let loader = this.loadingCtrl.create({
      content: `Your Requesst Has Been Sent`,
      duration: 1000
    });
    loader.present();
    this.navCtrl.setRoot(SearchPage);
  }

}
