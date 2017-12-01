import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, ModalController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../../home/home';
import { CarListService } from './../../../services/car-list/car-list.service';
import { OwnerDetailsService } from './../../../services/owner-details/owner-details.service';
import { PlatNumberService } from './../../../services/car-list/plate-number.service';
import { Car, PlateNumber } from './../../../models/car/car.model';
import { Owner } from './../../../models/owner/owner.model';

@IonicPage()
@Component({
  selector: 'page-owner-profile',
  templateUrl: 'owner-profile.html',
})
export class OwnerProfilePage {
  activeMenu: string = 'menu-O'
  public carRef: Array<any> = [];
  public plateRef: Array<{
    plateNum: string }> = [];
  public myPerson = {} as Owner;
  //public carList = {} as Car;
  carList: Observable<Car[]>;
  carListPlate: Observable<Car[]>;
  carPlate: Observable<PlateNumber[]>;
  carAvailRef: firebase.database.Reference;
  carListRef: firebase.database.Reference;
  carPlateRef: firebase.database.Reference;

  public plateNum = '';
  public plate = '';

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private owner: OwnerDetailsService,
    private ownerCar :CarListService,
    private plateCar: PlatNumberService,
    public alertCtrl: AlertController,
    private menu: MenuController,
    private modal: ModalController) {

      this.activeMenu= 'menu-O' ;
      this.menu.enable(true, 'menu-O');
      this.menu.enable(false, 'menu-U') ;

      this.afAuth.authState.subscribe((person) => {
        this.carPlateRef = firebase.database().ref(`Car-Rental/User/${person.uid}/Plate-Number`);
        this.carListRef = firebase.database().ref(`Car-Rental/Car-List`);

        this.carPlateRef.once('value', snapshot => {
          this.plateRef = [];
        snapshot.forEach(childSnapshot => {
          this.plateNum =  childSnapshot.child("/plateNum/").val();
          this.plateRef.push({plateNum: this.plateNum});
          return false;
        })
        })

        this.carListRef.once('value', snapshot => {
          this.carRef = [];
        snapshot.forEach(childSnapshot => {
          this.carRef.push(childSnapshot.val());
          return false;
        })
        })
      })
  }

ionViewDidLoad(){
      this.owner.getOwnerDetails().on('value', snapshot => {
          this.myPerson = snapshot.val();
      });

      /*this.plateCar.getPlate()
      .subscribe(snapshot =>{
        snapshot.forEach(plateShot => {
          this.plateNum = plateShot.val().plateNum;

          this.plateRef.push({plateNum: this.plateNum})
        })
      });

      this.ownerCar.getCarList()
      .subscribe(snapshot =>{
        snapshot.forEach(plateShot => {
          this.plate = plateShot.val().plate;

          this.carRef.push({plate: this.plate})
        })
      });*/
/*if(this.carRef.plate == this.plateRef.plateNum){
      this.carList = this.ownerCar
        .getCarList() //db list
        .snapshotChanges() //key and value passed
        .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        });
      }*/



      this.carList = this.ownerCar
        .getCarList() //db list
        .snapshotChanges() //key and value passed
        .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        });
}

  async confirmLogout(){
    return this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  logout(){
    let confirm = this.alertCtrl.create({
      title: `Logout`,
      message: 'Are you sure to log out your account?',
      buttons: [{
        text: "Cancel",
      },{
        text: "Logout",
        handler: () => { this.confirmLogout() }
      }]
    });
    confirm.present();
  }
  async editProfile(myPerson: Owner){
    this.navCtrl.push("OwnerEditProfilePage", {myPerson : myPerson});
  }
}
