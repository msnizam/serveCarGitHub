import { CarListService } from './../../../services/car-list/car-list.service';
import { ToastService } from './../../../services/toast/toast.service';
import { Car } from './../../../models/car/car.model';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Owner } from './../../../models/owner/owner.model';

import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-view-car',
  templateUrl: 'user-view-car.html',
})
export class UserViewCarPage {
  public plateRef: Array<{
    plateNum: string }> = [];
  public owner = {} as Owner;
  car: Car;
  carRef: Car;
  refOwner: Owner;
  ownerRef: firebase.database.Reference;
  carPlateRef: firebase.database.Reference;
  public plateNum = [];
  public plate = '';

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private ownersCarlist:CarListService,
    private toast: ToastService,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewWillLoad(){
    this.car = this.navParams.get('car');
    this.plate = this.car.plate;
  }

  async viewCar(car : Car){
    this.navCtrl.push("CarBookPage", { car: car });
  }

  async viewOwner(){
    //carRef = this.car;
    //refOwner = this.owner;
    this.afAuth.authState.subscribe(person => {
      this.ownerRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}`);
      this.carPlateRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}/Plate-Number`);

      this.carPlateRef.once('value', snapshot => {
        var index=0;
        this.plateRef = [];
      snapshot.forEach(childSnapshot => {
        this.plateNum[index] =  childSnapshot.child("/plateNum/").val();
        this.plateRef.push({plateNum: this.plateNum[index+1]});
        return false;
      })
      })

      this.ownerRef.once('value', snapshot => {
        var index = 0;
        if(this.plate == this.plateNum[index]){
          this.owner = snapshot.val();
          index = index + 1;
        }
      }).then(() => {
        this.navCtrl.push("UserViewOwnerProfilePage", {owner: this.owner, car: this.car});
      })
    })
  }
}
