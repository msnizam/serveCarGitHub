import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Car } from './../../../models/car/car.model';
import { Owner } from './../../../models/owner/owner.model';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-user-view-owner-profile',
  templateUrl: 'user-view-owner-profile.html',
})
export class UserViewOwnerProfilePage {

  ownerRef: firebase.database.Reference;
  //public myPerson: Array<{fullname: string, username: string, email: string, phone: number}> = [];
  public myPerson = {} as Owner;
  public owner = '';
  public ownerName = '';

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.owner = this.navParams.get("owner");

    this.afAuth.authState.subscribe(person => {
      this.ownerRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}`);

      this.ownerRef.on('value', snapshot => {
        snapshot.forEach(ownerSnapshot =>{
          this.ownerName = <string> ownerSnapshot.child(`/username/`).val();
          /*this.fullname = ownerSnapshot.child(`/fullname/`).val();
          this.email = ownerSnapshot.child(`/email/`).val();
          this.phone = ownerSnapshot.child(`/phone/`).val();

          if(<string> this.owner == this.ownerName){
            this.myPerson.push({fullname: this.fullname, username: this.ownerName, email: this.email, phone: this.phone});
          }*/
          return false;
        })
        if(this.ownerName == <string> this.owner){
          this.myPerson = snapshot.val();
        }
      })
    })
  }

}
