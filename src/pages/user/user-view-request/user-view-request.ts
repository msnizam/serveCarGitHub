import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarStatusService } from './../../../services/car-list/car-status.service';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Accept, Reject } from './../../../models/owner/owner.model';


@IonicPage()
@Component({
  selector: 'page-user-view-request',
  templateUrl: 'user-view-request.html',
})
export class UserViewRequestPage {
  bookAcceptList : Observable<Accept[]>;
  bookRejectList : Observable<Accept[]>;

  constructor(public navCtrl: NavController, private carStatus: CarStatusService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.bookAcceptList = this.carStatus
      .getBookAcceptList() //db list
      .snapshotChanges() //key and value passed
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });

      this.bookRejectList = this.carStatus
        .getBookRejectList() //db list
        .snapshotChanges() //key and value passed
        .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        });
  }

  async viewBookAccept(book: Accept){
    this.navCtrl.push("UserViewAcceptBookPage", {book: book });
  }

  async viewBookReject(book: Reject){
    this.navCtrl.push("UserViewRejectBookPage", {book: book });
  }

}
