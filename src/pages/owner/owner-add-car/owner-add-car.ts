import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { PlatNumberService } from './../../../services/car-list/plate-number.service';
import { CarListService } from './../../../services/car-list/car-list.service';
import { OwnerDetailsService } from './../../../services/owner-details/owner-details.service';
import { ToastService } from './../../../services/toast/toast.service';
import { Car } from './../../../models/car/car.model';
import { Owner } from './../../../models/owner/owner.model';
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
    weekdayRP: undefined,
    weekendRP: undefined,
    availability : '',
    owner: ''
  }

  //ownerObj: Owner = {
    public username = '';
    public fullname = '';
    public email = '';
    public phone: number;
    public status = '';
    public carCount: number;
    public carLimit: number;
//  };

  public ownerUsername = '';
  public readCarCount: number;
  public newCarCount: any;
  ownerRef: firebase.database.Reference;
  carCountRef: firebase.database.Reference;
  ownerDetailsRef: firebase.database.Reference;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private plateRef: PlatNumberService,
    private ownerServ: OwnerDetailsService,
    private rent: CarListService,
    private afData: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toast: ToastService,) {
      this.afAuth.authState.subscribe((person) => {
        this.ownerRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}/username`);
        this.ownerRef.on('value', snapshot => {
          this.ownerUsername = snapshot.val();
        });
        //read carCount
        this.carCountRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}/carCount`);
        this.carCountRef.on('value', snapshot => {
          this.readCarCount = snapshot.val();
          this.newCarCount = this.readCarCount+1;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnerAddCarPage');
  }

  addCar(car: Car) {
    this.rent.getCarList().push({
      type: car.type,
      make: car.make,
      model: car.model,
      transmission: car.transmission,
      year: car.year,
      plate: car.plate,
      weekdayRP: car.weekdayRP,
      weekendRP: car.weekendRP,
      availability: "Enabled",
      owner: this.ownerUsername,
    });

    this.ownerDetailsRef.update({
      fullname: this.fullname,
      username: this.username,
      phone: this.phone,
      status: this.status,
      email: this.email,
      carCount: this.newCarCount,
      carLimit: this.carLimit
    });

    this.toast.show(`${car.make} ${car.model} has been added!`);
    this.navCtrl.setRoot(OwnerProfilePage, {key: car.key});
  }

/*  editCarCount(carOwner: Owner){
    carOwner.carCount = this.newCarCount;
    this.ownerServ.editOwner(carOwner);
  }*/
}
