import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, ModalController, MenuController } from 'ionic-angular';
import { Renter } from './../../../models/owner/owner.model';
import { OwnerDetailsService } from './../../../services/owner-details/owner-details.service';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../login/login';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  splash = true;
  activeMenu: string = 'menu-U'
  public myPerson = {} as Renter;

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
    setTimeout(() => this.splash = false, 4000);
    this.owner.getRenterDetails().on('value', snapshot => {
        this.myPerson = snapshot.val();
    });
  }

  async editProfile(myPerson: Renter){
    this.navCtrl.push("UserEditProfilePage", {myPerson : myPerson});
  }

  async confirmLogout(){
    return this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  logout(){
    let confirm = this.alertCtrl.create({
      title: `Logout`,
      message: 'Are you sure to log out your account?',
      buttons: [{
        text: "Cancel",
      },{
        text: "Logout",
        handler: () => { this.confirmLogout() }
      }]
    });
    confirm.present();
  }

}
