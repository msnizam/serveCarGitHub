import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from './../../models/owner/owner.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';
import firebase from 'firebase';

import { OwnerProfilePage } from '../owner/owner-profile/owner-profile';
import { UserProfilePage } from '../user/user-profile/user-profile';
import { AdminPage } from '../admin/admin';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { OwnerDetailsService } from './../../services/owner-details/owner-details.service';
import { Owner } from './../../models/owner/owner.model';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  /*owner: Owner = {
    fullname: '',
    username: '',
    phone: undefined,
    email: '',
    status: '',
  }*/
  adminRef: firebase.database.Reference = firebase.database().ref(`Car-Rental/User`);
  userRef: firebase.database.Reference;
  ownerRef: firebase.database.Reference;
  user = {} as User;
  public userStatus = '';
  public ownerStatus = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private ownerData :OwnerDetailsService,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth) {

   }

  ionViewDidLoad() {
  }

  async login(user: User){
        this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((person) => {
        this.userRef = firebase.database().ref(`Car-Rental/User/Renter/${person.uid}`);
        this.ownerRef = firebase.database().ref(`Car-Rental/User/Owner/${person.uid}`);
        this.userRef.once('value', snapshot => {
            this.userStatus = snapshot.child("/status/").val();
        })
        this.ownerRef.once('value', snapshot => {
            this.ownerStatus = snapshot.child("/status/").val();
        })

        if(user.email == 'admin@mail.com' && user.password == 'admin123'){
          if(person.email == user.email && person.password == user.password){
          this.adminRef.set({
            email: user.email,
            password: user.password
          });
          this.navCtrl.setRoot(AdminPage);
          }
        }
        else{
        //await this.delay(5000);
        if(this.ownerStatus == "Owner"){
          if(person.emailVerified){
            let loader = this.loadingCtrl.create({
              content: `Welcome ${person.email} `,
              duration: 1500
            });
          loader.present();
          this.navCtrl.setRoot(OwnerProfilePage);
          }else{
              this.presentAlert()
          }
        }
        else if(this.userStatus == "User"){
          if(person.emailVerified){
            let loader = this.loadingCtrl.create({
              content: `Welcome ${person.email} `,
              duration: 1500
            });
          loader.present();
          this.navCtrl.setRoot(UserProfilePage);
        }else{
            this.presentAlert()
        }
        }

        }

    });
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
  reset(){
    this.navCtrl.push(ResetPasswordPage);
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
    title: 'Email Verification',
    subTitle: 'Please check your email to verify your account',
    buttons: ['Dismiss']
  });
  alert.present();
  }

}
