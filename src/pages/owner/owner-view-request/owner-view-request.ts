import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
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
  carBookList : Observable<Driver[]>;
  //carBookList : Array<any> = [];
  carBookRef: firebase.database.Reference;
  public plate = '';

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private carBook: CarBookService) {
      this.afAuth.authState.subscribe((person) => {
        this.carBookRef = firebase.database().ref(`Car-Rental/Car-Book`);
      })
  }

  ionViewDidLoad() {
    this.carBookRef.on('value', snapshot => {
      //this.carBookList = [];
    snapshot.forEach(childSnapshot => {
      this.plate = childSnapshot.child("/ownerPlate/").val();
      return false;
    })
  })
    this.carBookList = this.carBook
      .getCarBookList()
      //.getFilteredCarBookList(this.plate) //db list
      .snapshotChanges() //key and value passed
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
