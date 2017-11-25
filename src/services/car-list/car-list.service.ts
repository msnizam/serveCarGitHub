import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Car } from './../../models/car/car.model';

@Injectable()
export class CarListService {

  ownerID: string;
  carListRef: AngularFireList<Car>

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(owner => {
      if(owner) this.ownerID = owner.uid;
      this.carListRef = this.db.list(`Car-Rental/Car-List`);
    })
  }

  getCarList(){
    return this.carListRef;
  }

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
