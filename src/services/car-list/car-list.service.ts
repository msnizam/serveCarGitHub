import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Car } from './../../models/car/car.model';
import firebase from 'firebase';

@Injectable()
export class CarListService {

  ownerID: string;
  carListRef: AngularFireList<Car>
  ownerCarListRef: AngularFireList<Car>
  ///////////////////////////////////////
  ownerRef: firebase.database.Reference;
  carRef: firebase.database.Reference;
  public owner_username: '';
  public carlist_username: '';
  ///////////////////////////////////////
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(owner => {
      if(owner) this.ownerID = owner.uid;
      this.carListRef = this.db.list(`Car-Rental/Car-List`);
      /////////////////////////////////////
      this.ownerRef = firebase.database().ref(`Car-Rental/User/Owner/${owner.uid}/username`);
      this.ownerRef.on('value', snapshot => {
        this.owner_username = snapshot.val();
      });
      this.carRef = firebase.database().ref(`Car-Rental/Car-List`);
      this.carRef.on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          this.carlist_username = childSnapshot.child("/owner/").val();
          //if(this.carlist_username == this.owner_username)
          //  this.ownerCarListRef.push();
          return false;
        })
      })
      /////////////////////////////////////
    })
  }

  getCarList(){
    return this.carListRef;
  }
  ///////////////////////////////////////
  /*setFilteredCarList(car: Car){
    if(this.carlist_username == this.owner_username)
      this.ownerCarListRef.push(car);
  }*/

  getFilteredCarList(username: string){
    this.afAuth.authState.subscribe(owner => {
    this.ownerCarListRef = this.db.list(`Car-Rental/Car-List`, ref => ref.orderByChild('owner').equalTo(username));
    })
    return this.ownerCarListRef;
 }
  ///////////////////////////////////////
  addCar(car: Car){
    return this.carListRef.push(car);
  }

  editCar(car: Car){
    return this.carListRef.update(car.key, car);
  }

  removeCar(car: Car){
    return this.carListRef.remove(car.key);
  }
}
