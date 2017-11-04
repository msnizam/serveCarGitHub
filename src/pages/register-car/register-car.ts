import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register-car',
  templateUrl: 'register-car.html',
})
export class RegisterCarPage {
  addCarForm: FormGroup;


  constructor(public formBuilder: FormBuilder, public nav: NavController, public navParams: NavParams) {
    this.nav = nav;

    this.addCarForm = formBuilder.group({
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterCarPage');
  }

}
