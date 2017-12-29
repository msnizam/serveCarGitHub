import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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
  carListRef: firebase.database.Reference;
  usernameRef: firebase.database.Reference;
  public carBook : Array<{index: number, ownerPlate: string,
  name: string,
  renter: string,
  owner: string,
  ic: string,
  phone: number,
  location: string,
  dateBook: string,
  status: string,
  startTime: number,
  rentPeriod: number,
  price: number}> = [];
  public ownerPlate= [];
  public name= [];
  public renter= [];
  public owner= [];
  public ic= [];
  public phone= [];
  public location= [];
  public dateBook= [];
  public status= [];
  public startTime= [];
  public rentPeriod= [];
  public price= [];
  public owner_username = '';

  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private book: CarBookService
  ) {
      this.afAuth.authState.subscribe((person) => {
        this.carBookRef = firebase.database().ref(`Car-Rental/Car-Book`);
        this.usernameRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}/username`);
        this.usernameRef.on('value', snapshot => {
          this.owner_username = snapshot.child("/username/").val();
        });
      })
  }

  ionViewDidLoad() {
    /*this.carBookList = this.book
      .getCarBookList()
      //.getFilteredCarBookList(this.plate) //db list
      .snapshotChanges() //key and value passed
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });*/

      this.carBookList = this.db.list<Driver>(`Car-Rental/Car-Book`,
        ref => ref.orderByChild('owner').equalTo('peterparker88'/*ownerName*/))
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        });

      /*this.carBookRef.on('value', snapshot => {
        var index = 0;
        this.carBook = []
        snapshot.forEach(childSnapshot => {
          this.ownerPlate[index] = childSnapshot.child("/ownerPlate/").val();
          this.name[index] = childSnapshot.child("/name/").val();
          this.renter[index] = childSnapshot.child("/renter/").val();
          this.owner[index] = <string>childSnapshot.child("/owner/").val();
          this.ic[index] = childSnapshot.child("/ic/").val();
          this.phone[index] = childSnapshot.child("/phone/").val();
          this.location[index] = childSnapshot.child("/location/").val();
          this.dateBook[index] = childSnapshot.child("/dateBook/").val();
          this.status[index] = <string>childSnapshot.child("/status/").val();
          this.startTime[index] = childSnapshot.child("/startTime/").val();
          this.endTime[index] = childSnapshot.child("/endTime/").val();
          this.rentPeriod[index] = childSnapshot.child("/rentPeriod/").val();
          this.price[index] = childSnapshot.child("/price/").val();

          if(/*<string>this.owner_username == this.owner[index] &&*//*this.status[index] == "Pending"){
            this.carBook.push({index: (index+1), ownerPlate: this.ownerPlate[index],
            name: this.name[index],
            renter: this.renter[index],
            owner: this.owner[index],
            ic: this.ic[index],
            phone: this.phone[index],
            location: this.location[index],
            dateBook: this.dateBook[index],
            status: this.status[index],
            startTime: this.startTime[index],
            endTime: this.endTime[index],
            rentPeriod: this.rentPeriod[index],
            price: this.price[index]})
          }
          return false;
        })
      })*/
  }
  async viewBookList(driver: Driver){
    this.navCtrl.push("OwnerViewBookCarPage", {key: driver.key, driver: driver });
  }

}
