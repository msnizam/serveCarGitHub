import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarStatusService } from './../../../services/car-list/car-status.service';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Accept, Reject } from './../../../models/owner/owner.model';
import { UserProfilePage } from '../../user/user-profile/user-profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { OwnerDetailsService } from './../../../services/owner-details/owner-details.service';


@IonicPage()
@Component({
  selector: 'page-user-view-request',
  templateUrl: 'user-view-request.html',
})
export class UserViewRequestPage {
  userRef: firebase.database.Reference;
  bookAcceptList: firebase.database.Reference;
  bookRejectList: firebase.database.Reference;
  carAcceptList: Observable<Accept[]>;
  public carAccept: Array<{index: number, ownerPlate: string, dateBook: string, username: string, price: number, time: number}> = [];
  public carReject: Array<{index: number, title: string, des: string, ownerPlate: string, dateBook: string, username: string}> = [];
  public username1 = '';
  public username2 = [];
  public username3 = [];
  public ownerPlate = [];
  public dateBook = [];
  public price = [];
  public time = [];
  public title = [];
  public des = [];

  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private user: OwnerDetailsService,
    private carStatus: CarStatusService,
    public navParams: NavParams) {
      this.user.getRenterDetails().on('value', snapshot => {
          this.username1 = snapshot.val().username;
      });
  }

  ionViewDidLoad() {
    /*this.carAcceptList = this.carAccept.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val(),
      }));
    });*/
    this.bookAcceptList = firebase.database().ref(`Car-Rental/Car-Book-Accept`);
    this.bookRejectList = firebase.database().ref(`Car-Rental/Car-Book-Reject`);

    this.bookRejectList.on("value", snapshot => {
      var index = 0;
      this.carReject = [];
      snapshot.forEach(childSnapshot => {
        this.username3[index] = <string>childSnapshot.child("/username/").val();
        this.ownerPlate[index] = childSnapshot.child("/ownerPlate/").val();
        this.dateBook[index] = childSnapshot.child("/dateBook/").val();
        this.title[index] = childSnapshot.child("/title/").val();
        this.des[index] = childSnapshot.child("/des/").val();

        if(this.username3[index] == <string>this.username1){
          this.carReject.push({index: (index+1), ownerPlate: this.ownerPlate[index], dateBook: this.dateBook[index], username: this.username3[index], title: this.title[index], des: this.des[index]})
        }
        return false;
      })
    })

    this.bookAcceptList.on("value", snapshot => {
      var index = 0;
      this.carAccept = [];
      snapshot.forEach(childSnapshot => {
        this.username2[index] = <string>childSnapshot.child("/username/").val();
        this.ownerPlate[index] = childSnapshot.child("/ownerPlate/").val();
        this.dateBook[index] = childSnapshot.child("/dateBook/").val();
        this.price[index] = childSnapshot.child("/price/").val();
        this.time[index] = childSnapshot.child("/time/").val();

        if(this.username2[index] == <string>this.username1){
          this.carAccept.push({index: (index+1), ownerPlate: this.ownerPlate[index], dateBook: this.dateBook[index], username: this.username2[index], price: this.price[index], time: this.time[index]})
        }
        return false;
      })
    })
  }

  async viewBookAccept(book: Accept){
    this.navCtrl.push("UserViewAcceptBookPage", {book: book });
  }

  async viewBookReject(book: Reject){
    this.navCtrl.push("UserViewRejectBookPage", {book: book });
  }
  async profile(){
    this.navCtrl.setRoot(UserProfilePage);
  }

}
