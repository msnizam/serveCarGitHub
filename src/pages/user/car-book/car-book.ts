import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, ModalController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { Car } from './../../../models/car/car.model';
import { CarBookService } from './../../../services/car-list/car-book.service';

import firebase from 'firebase';
import { SearchPage } from '../../user/search/search';
import { Driver } from './../../../models/driver/driver.model';

@IonicPage()
@Component({
  selector: 'page-car-book',
  templateUrl: 'car-book.html',
})
export class CarBookPage {
  car: Car = {
    type: '',
    make: '',
    model: '',
    transmission: '',
    year: undefined,
    plate: '',
    rentPrice: undefined,
    availability: ''
  }
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
    public navParams: NavParams,
    private afData: AngularFireDatabase,
    private bookRef: CarBookService,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.car = this.navParams.get('car');
    this.ownerCarPLate = this.car.plate;
  }

  bookCar(driver: Driver){
    this.bookRef.getCarBookList().push({
      ownerPlate: this.ownerCarPLate,
      name: driver.name,
      ic: driver.ic,
      phone: driver.phone,
      address: driver.address,
      dateBook: driver.dateBook,
      time: driver.time
    }).then(ref => {
      let loader = this.loadingCtrl.create({
        content: `Your Requesst Has Been Sent`,
        duration: 1000
      });
      loader.present();
      this.navCtrl.setRoot(SearchPage, {key: ref.key});
    })
  }

  loading(){

  }

}
