import { CarListService } from './../../../services/car-list/car-list.service';
import { ToastService } from './../../../services/toast/toast.service';
import { Car } from './../../../models/car/car.model';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { Component } from '@angular/core';
import { OwnerProfilePage } from '../../owner/owner-profile/owner-profile';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-owner-edit-car',
  templateUrl: 'owner-edit-car.html',
})
export class OwnerEditCarPage{
  car: Car;
  public key: '';
  carListRef: firebase.database.Reference;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private ownersCarlist:CarListService,
    private toast: ToastService,
    public alertCtrl: AlertController,
  ) {
    this.afAuth.authState.subscribe((person) => {
      this.carListRef = firebase.database().ref(`Car-Rental/Car-List`);
    })
  }

  ionViewWillLoad(){
    this.car = this.navParams.get('car');
    this.key = this.navParams.get('key');
  }

  editCar(car: Car){
    this.ownersCarlist.editCar(car).then(() => {
      this.toast.show('Your changes have been saved!');
      this.navCtrl.setRoot(OwnerProfilePage);
    });
  }

  removeCar(car: Car){
    this.ownersCarlist.removeCar(car).then(() => {
      this.toast.show(`${car.model} has been removed!`);
      this.navCtrl.setRoot(OwnerProfilePage);
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
