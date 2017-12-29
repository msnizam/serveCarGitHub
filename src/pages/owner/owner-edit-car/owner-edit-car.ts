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
  public username = '';
  public fullname = '';
  public email = '';
  public phone: number;
  public status = '';
  public carCount: number;
  public carLimit: number;

  public readCarCount: number;
  public newCarCount: any;

  car: Car;
  carListRef: firebase.database.Reference;
  carCountRef: firebase.database.Reference;
  ownerDetailsRef: firebase.database.Reference;

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

      this.carCountRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}/carCount`);
      this.carCountRef.on('value', snapshot => {
        this.readCarCount = snapshot.val();
        this.newCarCount = this.readCarCount-1;
      });

      this.ownerDetailsRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}`);
      this.ownerDetailsRef.on('value', snapshot => {
        this.carLimit = snapshot.child("/carLimit/").val();
        this.email = snapshot.child("/email/").val();
        this.fullname = snapshot.child("/fullname/").val();
        this.phone = snapshot.child("/phone/").val();
        this.status = snapshot.child("/status/").val();
        this.username = snapshot.child("/username/").val();
      });
    })
  }

  ionViewWillLoad(){
    this.car = this.navParams.get('car');
  }

  saveCar(car: Car){
    this.ownersCarlist.editCar(car).then(() => {
      this.toast.show('Your changes have been saved!');
      this.navCtrl.setRoot(OwnerProfilePage);
    });
  }

  removeCar(car: Car){
    this.ownersCarlist.removeCar(car).then(() => {
      this.ownerDetailsRef.update({
        fullname: this.fullname,
        username: this.username,
        phone: this.phone,
        status: this.status,
        email: this.email,
        carCount: this.newCarCount,
        carLimit: this.carLimit
      });

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
