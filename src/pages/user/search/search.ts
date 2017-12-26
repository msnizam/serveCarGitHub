import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { CarListService } from './../../../services/car-list/car-list.service';
import { Car } from './../../../models/car/car.model';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  carRef: firebase.database.Reference;
  ownerRef: firebase.database.Reference;
  userRef: firebase.database.Reference;
  ownerCar = {} as Car;
  carList$: Observable<Car[]>;
  public carList: Array<any> = [];
  public loadedCarList: Array<any> = [];
  public userStatus = '';
  public availability = '';

  constructor(
    private rent: CarListService,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.carRef = firebase.database().ref(`Car-Rental/Car-List/`);
      //////////////////////////////////
      this.carRef.on('value', carList => {
        let cars = [];
        carList.forEach( car => {
          this.availability = car.child("/availability/").val();
          if(this.availability == "Enabled")
            cars.push(car.val());
          return false;
        });

        this.carList = cars;
        this.loadedCarList = cars;
      });
      /////////////////////////////////
  }

  ionViewDidLoad() { //display all car list of all owners
    this.carRef.on('value', snapshot => {
      this.carList = [];
      snapshot.forEach( childSnapshot => {
        this.availability = childSnapshot.child("/availability/").val();
        if(this.availability == "Enabled")
          this.carList.push(childSnapshot.val());
        return false;
      });
    })
  }

  async viewCar(car : Car){
    this.afAuth.authState.subscribe((person) => {
    this.userRef = firebase.database().ref(`Car-Rental/User/Renter/${person.uid}`);
    this.ownerRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}`);
    this.userRef.once('value', snapshot => {
      this.userStatus = snapshot.child("/status/").val();
    })

    this.ownerRef.once('value', snapshot => {
      this.userStatus = snapshot.child("/status/").val();
    })

    if(this.userStatus == "Owner"){
      this.navCtrl.push("OwnerViewCarPage", { car: car });
    }
    else if(this.userStatus == "User"){
      this.navCtrl.push("UserViewCarPage", { car: car });
    }
  })
}

  initializeItems(): void {
    this.carList = this.loadedCarList;
  }

  getCarList(searchbar){
    this.initializeItems();
    var q = searchbar.srcElement.value;

    if(!q){
      return;
    }

    this.carList = this.carList.filter((v) => {
      if((v.make || v.model || v.transmission) && q &&(v.availability == "Enabled")){
        if(v.make.toLowerCase().indexOf(q.toLowerCase()) > -1)
          return true;

        else if(v.model.toLowerCase().indexOf(q.toLowerCase()) > -1)
          return true;

        else if(v.transmission.toLowerCase().indexOf(q.toLowerCase()) > -1)
          return true;

        return false;
      }
    });
  }

}
