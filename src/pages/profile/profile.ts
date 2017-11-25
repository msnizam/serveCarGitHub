import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import firebase from 'firebase';

import { HomePage } from '../home/home';
import { CarListService } from './../../services/car-list/car-list.service';
import { OwnerDetailsService } from './../../services/owner-details/owner-details.service';
import { Car } from './../../models/car/car.model';
import { Owner } from './../../models/owner/owner.model';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  personRef: firebase.database.Reference;
  carRef: firebase.database.Reference;
  plateRef: firebase.database.Reference;
  carList$: Observable<Car[]>;
  public myPerson = {} as Owner;

  public plate = "";
  public plateNum = "";
  public email = "";

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private rent: CarListService,
    public alertCtrl: AlertController,
    private modal: ModalController) {


      this.afAuth.authState.subscribe((res) => {
      })

  }

  ionViewDidLoad(){
    this.afAuth.authState.subscribe(res => {
      this.personRef =  firebase.database().ref(`Car-Rental/Owner/${res.uid}`);
      this.personRef.on('value', snapshot => {
          /*snapshot.forEach(childSnapshot => {
          this.email = childSnapshot.child("/email/").val();
        });*/
          this.myPerson = snapshot.val();
      });

      /*if(res.email == this.email){
          this.plateRef =  firebase.database().ref(`Car-Rental/Owner/Plate-Number/${res.uid}`);
          this.carRef =  firebase.database().ref(`Car-Rental/Car-List/${res.uid}`);
          this.carRef.once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
          this.plate = childSnapshot.child("/plate/").val();
          })
        })
          this.plateRef.once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
          this.plateNum = childSnapshot.child("/plateNum/").val();
          })
        })*/
          //if(this.plate == this.plateNum){
              this.carList$ = this.rent
              .getCarList() //db list
              .snapshotChanges() //key and value passed
              .map(changes => {
                return changes.map(c => ({
                  key: c.payload.key,
                  ...c.payload.val(),
                }));
              });
            //}
    //}
  })
}

  openModal(){
    const myModal = this.modal.create('OwnerViewCarPage')
    myModal.present();
  }

  async confirmLogout(){
    return this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot(HomePage);
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
}
