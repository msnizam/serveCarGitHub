import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Owner } from './../../models/owner/owner.model';
import firebase from 'firebase';

@Injectable()
export class OwnerDetailsService {

  //private ownerDetailsRef = this.db.list<Owner>('owner-details');
  ownerID: string;
  ownerDetailsRef: firebase.database.Reference;
  rentailDetailsRef: firebase.database.Reference;
  constructor(
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(owner => {
      if(owner) this.ownerID = owner.uid;
      this.ownerDetailsRef = firebase.database().ref(`Car-Rental/User/Owner/${this.ownerID}`);
      this.rentailDetailsRef = firebase.database().ref(`Car-Rental/User/Rental/${this.ownerID}`);
    })
  }

  getOwnerDetails(){
    return this.ownerDetailsRef;
  }
  getRentailDetails(){
    return this.rentailDetailsRef;
  }

  editOwner(owner: Owner){
    return this.ownerDetailsRef.update(owner);
  }
  editRentail(owner: Owner){
    return this.rentailDetailsRef.update(owner);
  }
}
