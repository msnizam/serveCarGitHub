import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OwnerProfilePage } from '../../owner/owner-profile/owner-profile';
import { ToastService } from './../../../services/toast/toast.service';
import { Car } from './../../../models/car/car.model';
import { CarListService } from './../../../services/car-list/car-list.service';

@IonicPage()
@Component({
  selector: 'page-car-available',
  templateUrl: 'car-available.html',
})
export class CarAvailablePage {
  public carKey: '';
  car: Car = {
    type: '',
    make: '',
    model: '',
    transmission: '',
    year: undefined,
    plate: '',
    rentPrice: undefined,
    availability : ''
  }

  constructor(
  public navCtrl: NavController,
  private toast: ToastService,
  private ownerCar :CarListService,
  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.car = this.navParams.get('car');
    this.carKey = this.navParams.get('key');
  }

  async available(car: Car){
      this.ownerCar.getCarList().update(this.carKey, car).then(() => {
        this.toast.show('Your changes have been saved!');
        this.navCtrl.setRoot(OwnerProfilePage);
      });
  }

}
