import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../model/user";

@Injectable()
export class AuthorizeProvider {
  userId: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }

  join(itemKey) {
  const data = { [this.userId]: true}
  const members = this.db.object(`person/${itemKey}/carList`)
  members.update(data)
  }

}
