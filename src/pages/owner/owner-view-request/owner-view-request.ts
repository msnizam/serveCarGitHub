import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Driver } from './../../../models/driver/driver.model';
import { CarBookService } from './../../../services/car-list/car-book.service';

@IonicPage()
@Component({
  selector: 'page-owner-view-request',
  templateUrl: 'owner-view-request.html',
})
export class OwnerViewRequestPage {
  driver: Driver;
  carBookList$ : Observable<Driver[]>;
  carBookRef: firebase.database.Reference;

  constructor(
    private db: AngularFireDatabase,
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private carBook: CarBookService) {
      this.afAuth.authState.subscribe((person) => {
        this.carBookRef = firebase.database().ref(`Car-Rental/Car-Book`);
      })

      this.carBookList$ = this.db.list<Driver>(`Car-Rental/Car-Book`,
        ref => ref.orderByChild('ownerUsername').equalTo('peterparker88'/*ownerName*/))
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        });
  }

  async viewBookList(driver: Driver){
    this.navCtrl.push("OwnerViewBookCarPage", {key: driver.key, driver: driver });
  }

}
