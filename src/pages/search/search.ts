import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


import { CarListService } from './../../services/car-list/car-list.service';
import { Car } from './../../models/car/car.model';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  //carRef: firebase.database.Reference;
  carList$: Observable<Car[]>;
  constructor(
    private rent: CarListService,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //this.carRef = firebase.database()ref(`Car-Rental/Car-List`);
    this.afAuth.authState.subscribe(res => {
      this.carList$ = this.rent
      .getCarList() //db list
      .snapshotChanges() //key and value passed
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
    })
  }

}
