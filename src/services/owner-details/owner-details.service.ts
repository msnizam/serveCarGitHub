import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Owner } from './../../models/owner/owner.model';

@Injectable()
export class OwnerDetailsService {

  ownerID: string;
  ownerDetailsRef: AngularFireObject<User>
  //constructor(private db: AngularFireDatabase) {}
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(owner => {
      if(owner) this.ownerID = owner.uid;
      this.ownerDetailsRef = this.db.object<User>(`person/${this.ownerID}`);
    })
  }

  getOwnerDetails(){
    return this.ownerDetailsRef;
  }
}
