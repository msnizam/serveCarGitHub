import { CarListService } from './../../services/car-list/car-list.service';
import { ToastService } from './../../services/toast/toast.service';
import { Car } from './../../models/car/car.model';

import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

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
    private ownersCarlist:CarListService,
    private toast: ToastService,
    public alertCtrl: AlertController,
  ) {}

  ionViewWillLoad(){
    this.car = this.navParams.get('car');
  }

  saveCar(car: Car){
    this.ownersCarlist.editCar(car).then(() => {
      this.toast.show('Your changes have been saved!');
      this.navCtrl.setRoot(ProfilePage);
    });
  }

  removeCar(car: Car){
    this.ownersCarlist.removeCar(car).then(() => {
      this.toast.show(`${car.model} has been removed!`);
      this.navCtrl.setRoot(ProfilePage);
    });
  }

  confirmRemove(car: Car){
    let confirm = this.alertCtrl.create({
      title: `${car.make} ${car.model}`,
      message: 'Are you sure to remove this car?',
      buttons: [{
        text: "Cancel",
      },
      {
        text: "Remove",
        handler: () => { this.removeCar(car) }
      }]
    });
    confirm.present();
  }

}
