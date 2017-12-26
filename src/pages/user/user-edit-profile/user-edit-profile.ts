import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Renter } from './../../../models/owner/owner.model';
import { OwnerDetailsService } from './../../../services/owner-details/owner-details.service';
import { UserProfilePage } from '../../user/user-profile/user-profile';
import { ToastService } from './../../../services/toast/toast.service';

@IonicPage()
@Component({
  selector: 'page-user-edit-profile',
  templateUrl: 'user-edit-profile.html',
})
export class UserEditProfilePage {
  renter : Renter = {
    username: '',
    fullname: '',
    email: '',
    phone: undefined,
    status: '',
  };

  constructor(
  public navCtrl: NavController,
  private ownerRef: OwnerDetailsService,
  private toast: ToastService,
  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.renter = this.navParams.get('myPerson');
  }

  editProfile(renter : Renter){
    this.ownerRef.editRenter(renter).then(() => {
      this.toast.show('Your changes have been saved!');
      this.navCtrl.setRoot(UserProfilePage);
    });
  }
}
