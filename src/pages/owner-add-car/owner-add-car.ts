import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarListService } from './../../services/car-list/car-list.service';
import { ToastService } from './../../services/toast/toast.service';
import { Car } from './../../model/car/car.model';

@IonicPage()
@Component({
  selector: 'page-owner-add-car',
  templateUrl: 'owner-add-car.html',
})
export class OwnerAddCarPage {
  car: Car = {
    type: '',
    make: '',
    model: '',
    transmission: '',
    year: undefined
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rent: CarListService,
    private toast: ToastService,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnerAddCarPage');
  }

  addCar(car: Car) {
    this.rent.addCar(car).then(ref => {
      this.toast.show(`${car.make} ${car.model} has been added!`);
      this.navCtrl.setRoot('ProfilePage', {key: ref.key});
    });
  }

}
