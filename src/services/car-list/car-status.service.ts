import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Accept, Reject } from './../../models/owner/owner.model';
import firebase from 'firebase';

@Injectable()
export class CarStatusService {

  bookAcceptRef: AngularFireList<Accept>
  bookRejectRef: AngularFireList<Reject>

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(owner => {
      this.bookAcceptRef = this.db.list(`Car-Rental/Car-Book-Accept`);
      this.bookRejectRef = this.db.list(`Car-Rental/Car-Book-Reject`);
    })
  }

  getBookAcceptList(){
    return this.bookAcceptRef;
  }
  getBookRejectList(){
    return this.bookRejectRef;
  }
}
