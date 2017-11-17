import { Component } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../home/home';
import { OwnerAddCarPage } from '../owner-add-car/owner-add-car';
import { CarListService } from './../../services/car-list/car-list.service';
import { User } from "../../model/user";
import { Car } from './../../model/car/car.model';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  //user = {} as User;
  profileRef: AngularFireObject<User>;
  profileData$: Observable<User[]>;
  carList$: Observable<Car[]>;

  constructor(public loadingCtrl: LoadingController, private afAuth: AngularFireAuth,
    private afData: AngularFireDatabase, private rent: CarListService,
    public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.uid){
        let loader = this.loadingCtrl.create({
          content: `Welcome ${data.email} `,
          duration: 1500
        });
      loader.present();
      this.profileRef = this.afData.object(`person/${data.uid}`);

      /*this.carList$ = this.rent
        .getCarList() //db list
        .snapshotChanges() //key and value passed
        .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        });*/

      }
    })
  }

  async addCar(){
    this.navCtrl.push(OwnerAddCarPage);
  }

  async logout(){
    this.afAuth.auth.signOut().then(() => {
       console.log("Logout successful");
       this.navCtrl.setRoot(HomePage);
    });
    }
}
