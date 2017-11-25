import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Owner } from './../../models/owner/owner.model';

@Injectable()
export class OwnerDetailsService {

  //private ownerDetailsRef = this.db.list<Owner>('owner-details');
  ownerID: string;
  ownerDetailsRef: AngularFireObject<Owner>
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(owner => {
      if(owner) this.ownerID = owner.uid;
      this.ownerDetailsRef = this.db.object(`Car-Rental/Owner/${this.ownerID}`);
    })
  }

  getOwnerDetails(){
    return this.ownerDetailsRef;
  }

  regOwner(owner: Owner){
    return this.ownerDetailsRef.set(owner);
  }
}
