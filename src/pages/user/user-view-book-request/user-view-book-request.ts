import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Driver } from './../../../models/driver/driver.model';
import { CarBookService } from './../../../services/car-list/car-book.service';
import { OwnerDetailsService } from './../../../services/owner-details/owner-details.service';

@IonicPage()
@Component({
  selector: 'page-user-view-book-request',
  templateUrl: 'user-view-book-request.html',
})
export class UserViewBookRequestPage {
  public carBook: Array<{
                        index: number,
                        ownerPlate: string,
                        name: string,
                        renter: string,
                        ic: string,
                        phone: number,
                        location: string,
                        dateBook: string,
                        status: string,
                        startTime: number,
                        endTime: number,
                        rentPeriod: number,
                        price: number}> = [];
  carBookList : Observable<Driver[]>;
  //carBookList : Array<any> = [];
  carBookRef: firebase.database.Reference;
  userRef: firebase.database.Reference;
  public username1 = '';
  public ownerPlate = [];
  public name = [];
  public renter = [];
  public ic = [];
  public phone = [];
  public location = [];
  public dateBook = [];
  public status = [];
  public startTime = [];
  public endTime = [];
  public rentPeriod = [];
  public price = [];

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private user: OwnerDetailsService) {
      this.user.getRenterDetails().on('value', snapshot => {
          this.username1 = snapshot.val().username;
      });
  }

  ionViewDidLoad() {
    this.carBookRef = firebase.database().ref(`Car-Rental/Car-Book`);

    this.carBookRef.on("value", snapshot => {
      var index = 0;
      this.carBook = [];
      snapshot.forEach(childSnapshot => {
        this.name[index] = childSnapshot.child("/name/").val();
        this.ownerPlate[index] = childSnapshot.child("/ownerPlate/").val();
        this.dateBook[index] = childSnapshot.child("/dateBook/").val();
        this.renter[index] = <string>childSnapshot.child("/renter/").val();
        this.ic[index] = childSnapshot.child("/ic/").val();
        this.phone[index] = childSnapshot.child("/phone/").val();
        this.location[index] = childSnapshot.child("/location/").val();
        this.status[index] = childSnapshot.child("/status/").val();
        this.startTime[index] = childSnapshot.child("/startTime/").val();
        this.endTime[index] = childSnapshot.child("/endTime/").val();
        this.rentPeriod[index] = childSnapshot.child("/rentPeriod/").val();
        this.price[index] = childSnapshot.child("/price/").val();

        if(this.renter[index] == <string>this.username1){
          this.carBook.push({index: (index+1),
            ownerPlate: this.ownerPlate[index],
            name: this.name[index],
            renter: this.renter[index],
            ic: this.ic[index],
            phone: this.phone[index],
            location: this.location[index],
            dateBook: this.dateBook[index],
            status: this.status[index],
            startTime: this.startTime[index],
            endTime: this.endTime[index],
            rentPeriod: this.rentPeriod[index],
            price: this.price[index]
          })
        }
        return false;
      })
    })


    /*this.carBookRef.on('value', snapshot => {
      this.carBookList = [];
    snapshot.forEach(childSnapshot => {
      this.carBookList.push(childSnapshot.val());
      return false;
    })
  })*/
    /*this.carBookList = this.carBook
      .getCarBookList() //db list
      .snapshotChanges() //key and value passed
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });*/
  }
  async viewBookList(driver: Driver){
    this.navCtrl.push("UserViewBookCarPage", {key: driver.key, driver: driver });
  }

}
