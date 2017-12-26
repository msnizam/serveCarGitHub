import { CarListService } from './../../../services/car-list/car-list.service';
import { ToastService } from './../../../services/toast/toast.service';
import { Car } from './../../../models/car/car.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Owner } from './../../../models/owner/owner.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-view-car',
  templateUrl: 'user-view-car.html',
})
export class UserViewCarPage {
  car: Car;
  public owner = '';

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private ownersCarlist:CarListService,
    private toast: ToastService,
    public alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser,
  ) {
  }

  ionViewWillLoad(){
    this.car = this.navParams.get('car');
    this.owner = this.car.owner;
  }

  async viewCar(car : Car){
    this.navCtrl.push("CarBookPage", { car: car });
  }

  async viewOwner(){
    this.openWebPage("https://api.whatsapp.com/send?phone=60142288047&text=")
  }

  openWebPage(url: string){
    const browser = this.inAppBrowser.create(url,'_system');
  }
}
