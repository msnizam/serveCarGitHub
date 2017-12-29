import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, ModalController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { LoginPage } from '../../login/login';
import { CarListService } from './../../../services/car-list/car-list.service';
import { OwnerDetailsService } from './../../../services/owner-details/owner-details.service';
import { Car } from './../../../models/car/car.model';
import { Owner } from './../../../models/owner/owner.model';

@IonicPage()
@Component({
  selector: 'page-owner-profile',
  templateUrl: 'owner-profile.html',
})
export class OwnerProfilePage {
  activeMenu: string = 'menu-O';
  public myPerson = {} as Owner;
  //////////////////////////////
  splash = true;
  public owner_username: '';
  public carLimit: number;
  public carCount: number;
  //////////////////////////////
  carList$: Observable<Car[]>;
  carAvailRef: firebase.database.Reference;
  usernameRef: firebase.database.Reference;
  carCountRef: firebase.database.Reference;

  constructor(
    private db: AngularFireDatabase,
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private owner: OwnerDetailsService,
    private ownerCar :CarListService,
    public alertCtrl: AlertController,
    private menu: MenuController,
    private inAppBrowser: InAppBrowser,
    private modal: ModalController) {

      this.activeMenu = 'menu-O' ;
      this.menu.enable(true, 'menu-O');
      this.menu.enable(false, 'menu-U') ;

      this.afAuth.authState.subscribe((person) => {
        this.usernameRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}/username`);
        this.usernameRef.on('value', snapshot => {
          this.owner_username =snapshot.val();
        });

        this.carCountRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}`);
        this.carCountRef.on('value', snapshot => {
          this.carCount = snapshot.child("/carCount/").val();
          this.carLimit = snapshot.child("/carLimit/").val();
        });
      })

      this.owner.getOwnerDetails().on('value', snapshot => {
        this.myPerson = snapshot.val();
      });

      //this.carList$ = this.filterCarList(this.owner_username);
      this.carList$ = this.db.list<Car>(`Car-Rental/Car-List`,
        ref => ref.orderByChild('owner').equalTo('peterparker88'/*ownerName*/))
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        });
  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }

  filterCarList(ownerName: string){
    return this.db.list<Car>(`Car-Rental/Car-List`,
      ref => ref.orderByChild('owner').equalTo('peterparker88'/*ownerName*/))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  compareCarLimit(){
    if(this.carCount >= this.carLimit){
      let limitReach = this.alertCtrl.create({
        title: `Limit Reached!`,
        message: 'You have reached your car limit number. To register more cars, please contact the admin',
        buttons: [{
          text: "No! Thanks",
        },{
          text: "Yes! Sure",
          handler: () => { this.openWebPage("https://api.whatsapp.com/send?phone=601110360906&text=") }
        }]
      });
      limitReach.present();
    }else this.navCtrl.push("OwnerAddCarPage");

  }

  openWebPage(url: string){
    const browser = this.inAppBrowser.create(url,'_system');
  }

  async confirmLogout(){
    return this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  logout(){
    let confirm = this.alertCtrl.create({
      title: `Logout`,
      message: 'Are you sure to log out your account?',
      buttons: [{
        text: "Cancel",
      },{
        text: "Logout",
        handler: () => { this.confirmLogout() }
      }]
    });
    confirm.present();
  }
  async editProfile(myPerson: Owner){
    this.navCtrl.push("OwnerEditProfilePage", {myPerson : myPerson});
  }
}
