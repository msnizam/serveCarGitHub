import { Car } from './../../../models/car/car.model';

import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-owner-view-car',
  templateUrl: 'owner-view-car.html',
})
export class OwnerViewCarPage{
  car: Car;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {}

  ionViewWillLoad(){
    this.car = this.navParams.get('car');
  }
}
