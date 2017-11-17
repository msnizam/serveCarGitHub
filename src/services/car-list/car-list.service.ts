import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Car } from './../../model/car/car.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CarListService {

  private carListRef = this.db.list<Car>('car-list');
  carListRef: Observable<Car[]> = null;
  userId: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }

  getCarList(){
    if (!this.userId) return;
    this.carListRef = this.db.list(`carList/${this.userId}`);
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
