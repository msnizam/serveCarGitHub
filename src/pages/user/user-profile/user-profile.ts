import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, ModalController, MenuController } from 'ionic-angular';
import { Owner } from './../../../models/owner/owner.model';
import { OwnerDetailsService } from './../../../services/owner-details/owner-details.service';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  activeMenu: string = 'menu-U'
  public myPerson = {} as Owner;

  constructor(public navCtrl: NavController,
  private afAuth: AngularFireAuth,
  private owner: OwnerDetailsService,
  public alertCtrl: AlertController,
  private menu: MenuController) {
    this.activeMenu= 'menu-U' ;
    this.menu.enable(false, 'menu-O');
    this.menu.enable(true, 'menu-U') ;
  }

  ionViewDidLoad() {
    this.owner.getOwnerDetails().on('value', snapshot => {
        this.myPerson = snapshot.val();
    });
  }
  async editProfile(myPerson: Owner){
    this.navCtrl.push("OwnerEditProfilePage", {myPerson : myPerson});
  }

}
