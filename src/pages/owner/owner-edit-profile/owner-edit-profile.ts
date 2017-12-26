import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Owner } from './../../../models/owner/owner.model';
import { OwnerDetailsService } from './../../../services/owner-details/owner-details.service';
import { OwnerProfilePage } from '../../owner/owner-profile/owner-profile';
import { ToastService } from './../../../services/toast/toast.service';

@IonicPage()
@Component({
  selector: 'page-owner-edit-profile',
  templateUrl: 'owner-edit-profile.html',
})
export class OwnerEditProfilePage {
  owner : Owner = {
    username: '',
    fullname: '',
    email: '',
    phone: undefined,
    status: '',
    carCount: undefined,
    carLimit: undefined
  };

  constructor(
  public navCtrl: NavController,
  private ownerRef: OwnerDetailsService,
  private toast: ToastService,
  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.owner = this.navParams.get('myPerson');
  }

  editProfile(owner: Owner){
    this.ownerRef.editOwner(owner).then(() => {
      this.toast.show('Your changes have been saved!');
      this.navCtrl.setRoot(OwnerProfilePage);
    });
  }
}
