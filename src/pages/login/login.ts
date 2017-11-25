import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from './../../models/owner/owner.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';


import { ProfilePage } from '../profile/profile';
import { AdminPage } from '../admin/admin';
import { RegisterPage } from '../register/register';
import { ResetPasswordPage } from '../reset-password/reset-password';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User){
    try{
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((person) => {
        if(user.email == 'admin@mail.com' && user.password == 'admin123'){
          if(person.email == user.email && person.password == user.password)
          this.navCtrl.setRoot(AdminPage);
        }
        else{
        /*if(person.emailVerified){
          let loader = this.loadingCtrl.create({
            content: `Welcome ${person.email} `,
            duration: 1500
          });
        loader.present();*/
        this.navCtrl.setRoot(ProfilePage);
        /*}
        else{
            this.presentAlert()
        }*/
      }
    });
    }catch(e){
      console.log(e);
    }
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
