import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from 'angularfire2/database';
import { User } from "../../model/user";

@Injectable()
export class AuthorizeProvider {

  constructor(private db: AngularFireDatabase) {

  }

  private userRef = this.db.object<User>('person');

}
