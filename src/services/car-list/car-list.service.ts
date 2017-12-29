import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Car } from './../../models/car/car.model';
import firebase from 'firebase';

@Injectable()
export class CarListService {

  ownerID: string;
  carListRef: AngularFireList<Car>
  ///////////////////////////////////////
  ownerRef: firebase.database.Reference;
  public owner_username: string;
  ///////////////////////////////////////
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(owner => {
      if(owner) this.ownerID = owner.uid;
      this.carListRef = this.db.list<Car>(`Car-Rental/Car-List`);

      this.ownerRef = firebase.database().ref(`Car-Rental/User/Owner/${this.ownerID}/username`);
      this.ownerRef.on('value', snapshot => {
        this.owner_username = snapshot.val();
      });
    })
  }

  getCarList(){
    return this.carListRef;
  }

  getFilteredCarList(){
    return this.db.list<Car>(`Car-Rental/Car-List`,
      ref => ref.orderByChild('owner').equalTo(this.owner_username));
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
