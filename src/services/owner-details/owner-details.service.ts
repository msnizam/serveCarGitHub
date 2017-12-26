import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Owner, Renter } from './../../models/owner/owner.model';
import firebase from 'firebase';

@Injectable()
export class OwnerDetailsService {

  //private ownerDetailsRef = this.db.list<Owner>('owner-details');
  ownerID: string;
  ownerDetailsRef: firebase.database.Reference;
  renterDetailsRef: firebase.database.Reference;
  carCountRef: firebase.database.Reference;

  constructor(
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(owner => {
      if(owner) this.ownerID = owner.uid;
      this.ownerDetailsRef = firebase.database().ref(`Car-Rental/User/Owner/${this.ownerID}`);
      this.renterDetailsRef = firebase.database().ref(`Car-Rental/User/Renter/${this.ownerID}`);
      //this.carCountRef = firebase.database().ref(`Car-Rental/User/Owner/${this.ownerID}/carCount`);
    })
  }

  getOwnerDetails(){
    return this.ownerDetailsRef;
  }
  getRenterDetails(){
    return this.renterDetailsRef;
  }
  editCarCount(owner: Owner){
    return this.ownerDetailsRef.update(owner);
  }
  editOwner(owner: Owner){
    return this.ownerDetailsRef.update(owner);
  }
  editRenter(owner: Renter){
    return this.renterDetailsRef.update(owner);
  }
}
