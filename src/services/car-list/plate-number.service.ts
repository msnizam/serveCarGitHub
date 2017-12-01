import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlateNumber } from './../../models/car/car.model';
import firebase from 'firebase';

@Injectable()
export class PlatNumberService {

  plateID: string;
  plateListRef: AngularFireList<PlateNumber>

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(plate => {
      if(plate) this.plateID = plate.uid;
      this.plateListRef = this.db.list(`Car-Rental/User/${this.plateID}/Plate-Number`);
    })
  }

  getPlate(){
    return this.plateListRef;
  }
}
