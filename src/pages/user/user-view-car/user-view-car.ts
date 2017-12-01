import { CarListService } from './../../../services/car-list/car-list.service';
import { ToastService } from './../../../services/toast/toast.service';
import { Car } from './../../../models/car/car.model';

import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-view-car',
  templateUrl: 'user-view-car.html',
})
export class UserViewCarPage {

  car: Car;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ownersCarlist:CarListService,
    private toast: ToastService,
    public alertCtrl: AlertController,
  ) {}

  ionViewWillLoad(){
    this.car = this.navParams.get('car');
  }

  async viewCar(car : Car){
    this.navCtrl.push("CarBookPage", { car: car });
  }
}
