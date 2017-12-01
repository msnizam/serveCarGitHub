import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { PlatNumberService } from './../../../services/car-list/plate-number.service';
import { CarListService } from './../../../services/car-list/car-list.service';
import { ToastService } from './../../../services/toast/toast.service';
import { Car } from './../../../models/car/car.model';
import { OwnerProfilePage } from '../../owner/owner-profile/owner-profile';

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
    rentPrice: undefined,
    availability : ''
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
        this.plateNum = car.plate;
        this.rent.getCarList().push({
          type: car.type,
          make: car.make,
          model: car.model,
          transmission: car.transmission,
          year: car.year,
          plate: car.plate,
          rentPrice: car.rentPrice,
          availability : "Enabled"
        })

          this.plateRef.getPlate().push({
            plateNum: this.plateNum,
          })
          
          this.toast.show(`${car.make} ${car.model} has been added!`);
          this.navCtrl.setRoot(OwnerProfilePage, {key: car.key});

    }
}
