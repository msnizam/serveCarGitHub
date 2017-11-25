import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { PlatNumberService } from './../../services/car-list/plate-number.service';
import { CarListService } from './../../services/car-list/car-list.service';
import { ToastService } from './../../services/toast/toast.service';
import { Car } from './../../models/car/car.model';
import { ProfilePage } from '../profile/profile';

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
    year: undefined,
    plate: '',
    rentPrice: undefined
  }
    public plateNum = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plateRef: PlatNumberService,
    private rent: CarListService,
    private afData: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toast: ToastService,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnerAddCarPage');
  }

  addCar(car: Car) {

    this.afAuth.authState.subscribe(user => {
          this.plateNum = car.plate;
          this.afData.list(`Car-Rental/Owner/${user.uid}/Plate-Number`)
          .push({
            plateNum: this.plateNum
          }).then(() => {
            this.afData.list(`Car-Rental/Car-List`).push(car).then(ref => {
              this.toast.show(`${car.make} ${car.model} has been added!`);
              this.navCtrl.setRoot(ProfilePage, {key: ref.key});
            });
          });
      })
    }
}
