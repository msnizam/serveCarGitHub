import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Driver } from './../../models/driver/driver.model';
import firebase from 'firebase';

@Injectable()
export class CarBookService {

  ownerID: string;
  carBookRef: AngularFireList<Driver>
  ownerCarListRef: AngularFireList<Driver>
  CarBookListRef: firebase.database.Reference;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(owner => {
      this.carBookRef = this.db.list(`Car-Rental/Car-Book`);
      this.CarBookListRef = firebase.database().ref(`Car-Rental/Car-Book`);
    })
  }

  getCarBookList(){
    return this.carBookRef;
    //return this.CarBookListRef;
  }

  getFilteredCarBookList(plate: string){
    this.ownerCarListRef = this.db.list(`Car-Rental/Car-List`, ref => ref.orderByChild('ownerPlate').equalTo(plate));
    return this.ownerCarListRef;
 }

  /*removeCarBook(driver: Driver){
    return this.carBookRef.remove(driver.key);
  }*/
}
