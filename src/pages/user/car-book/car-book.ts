import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, IonicPage, ModalController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { Car } from './../../../models/car/car.model';
import { CarBookService } from './../../../services/car-list/car-book.service';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase';
import { UserProfilePage } from '../../user/user-profile/user-profile';
import { Driver } from './../../../models/driver/driver.model';

@IonicPage()
@Component({
  selector: 'page-car-book',
  templateUrl: 'car-book.html',
})
export class CarBookPage {
  carBookForm: FormGroup;
  userRef: firebase.database.Reference;

  car: Car = {
    type: '',
    make: '',
    model: '',
    transmission: '',
    year: undefined,
    plate: '',
    weekdayRP: undefined,
    weekendRP: undefined,
    availability: '',
    owner: ''
  }

  driver: Driver = {
    carMake: '',
    carModel: '',
    ownerPlate: '',
    ownerUsername: '',
    name: '',
    renter: '',
    ic: '',
    phone: undefined,
    location: '',
    dateBook: '',
    status: '',
    startTime: undefined,
    //endTime: undefined,
    rentPeriod: undefined,
    price: undefined
  }

  public carMake = '';
  public carModel = '';
  public ownerCarPLate = '';
  public ownerUsername = '';
  public username = '';
  public totalPrice = 0;
  public date: any;
  public todayDate = '';
  public today = '';
  public tempDate: any;
  public hari = '';
  public day: any;

  constructor(
    public navParams: NavParams,
    private afData: AngularFireDatabase,
    private bookRef: CarBookService,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController) {
      this.navCtrl = navCtrl;

      this.carBookForm = formBuilder.group({
        uname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
        identify: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
        phoneNum: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
        place: ['',  Validators.compose([Validators.required])]
      });

      this.date = new Date();
      this.todayDate = this.date.getFullYear().toString()+'-'+
                       (this.date.getMonth()+1).toString()+'-'+
                       this.date.getDate().toString();

      this.today = this.date.getDay().toString();

      this.tempDate = new Date(this.date.getFullYear(), this.date.getMonth(),this.date.getDate());
      this.day = this.tempDate.getDay();
      switch(this.day){
        case 0: this.hari = 'Sunday';
                  break;
        case 1: this.hari = 'Monday';
                  break;
        case 2: this.hari = 'Tuesday';
                  break;
        case 3: this.hari = 'Wednesday';
                  break;
        case 4: this.hari = 'Thursday';
                  break;
        case 5: this.hari = 'Friday';
                  break;
        case 6: this.hari = 'Saturday';
                  break;
        default: break;
      }
  }

  ionViewDidLoad() {
    this.car = this.navParams.get('car');
    this.ownerCarPLate = this.car.plate;
  }

  bookCar(driver: Driver){
    //to differentiate weekday and weekend price
    if(this.today == '5'||this.today == '6')
      this.totalPrice = (this.car.weekendRP * driver.rentPeriod);
    else this.totalPrice = (this.car.weekdayRP * driver.rentPeriod);

    this.afAuth.authState.subscribe(person =>{
      this.userRef = firebase.database().ref(`Car-Rental/User/Renter/${person.uid}`);

      this.userRef.once('value', snapshot => {
        this.username = snapshot.child("/username/").val();
      }).then(() => {
        this.bookRef.getCarBookList().push({
          ownerPlate: this.ownerCarPLate,
          carMake: this.car.make,
          carModel: this.car.model,
          ownerUsername: this.car.owner,
          name: driver.name,
          renter: this.username,
          ic: driver.ic,
          phone: driver.phone,
          location: driver.location,
          dateBook: driver.dateBook,
          status: "Pending",
          startTime: driver.startTime,
          //endTime: driver.endTime,
          rentPeriod: driver.rentPeriod,
          price: this.totalPrice,
        }).then(ref => {
          let loader = this.loadingCtrl.create({
            content: `Your Request Has Been Sent!`,
            duration: 1000
          });
          loader.present();
          this.navCtrl.setRoot(UserProfilePage, {key: ref.key});
        })
      });
    })
  }

}
